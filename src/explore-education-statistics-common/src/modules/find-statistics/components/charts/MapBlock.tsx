import Details from '@common/components/Details';
import { FormSelect } from '@common/components/form';
import { SelectOption } from '@common/components/form/FormSelect';
import {
  ChartDefinition,
  ChartProps,
  createDataForAxis,
  generateKeyFromDataSet,
  ChartDataB,
} from '@common/modules/find-statistics/components/charts/ChartFunctions';

import {
  DataBlockData,
  DataBlockGeoJsonProperties,
  DataBlockLocation,
  DataBlockLocationMetadata,
  DataBlockMetadata,
} from '@common/services/dataBlockService';
import {
  AxisConfiguration,
  Chart,
  ChartDataSet,
} from '@common/services/publicationService';
import { Dictionary } from '@common/types/util';
import classNames from 'classnames';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';

import { Layer, LeafletMouseEvent, Path, Polyline } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { GeoJSON, LatLngBounds, Map } from 'react-leaflet';
import styles from './MapBlock.module.scss';

export type MapFeature = Feature<Geometry, GeoJsonProperties>;

interface MapProps extends ChartProps {
  position?: { lat: number; lng: number };
  maxBounds?: LatLngBounds;
}

interface IdValue {
  id: string;
  value: string;
}

interface LegendEntry {
  min: string;
  max: string;
  idx: number;
}

interface SelectedEntry {
  dataSet: string;
}

interface MapClickEvent extends LeafletMouseEvent {
  layer: Layer;
  sourceTarget: {
    feature: MapFeature;
  };
}

function getLowestLocationCode(location: DataBlockLocation) {
  return (
    (location.localAuthorityDistrict && location.localAuthorityDistrict.code) ||
    (location.localAuthority && location.localAuthority.code) ||
    (location.region && location.region.code) ||
    (location.country && location.country.code) ||
    ''
  );
}

function getLocationsForDataSet(
  data: DataBlockData,
  meta: DataBlockMetadata,
  chartData: ChartDataB[],
) {
  const allLocationIds = chartData.map(({ name }) => name);

  return [
    { label: 'select...', value: '' },
    ...allLocationIds
      .reduce((locations: { label: string; value: string }[], next: string) => {
        const { label, value } = (meta.locations || {})[next];

        return [...locations, { label, value }];
      }, [])
      .sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      }),
  ];
}

function getGeometryForOptions(
  meta: DataBlockMetadata,
  sourceData: ChartDataB[],
  min: number,
  scale: number,
): FeatureCollection<Geometry, DataBlockGeoJsonProperties> {
  const calculateColorStyle = (value: number) =>
    styles[`rate${Math.min(Math.floor((value - min) / scale), 4).toFixed(0)}`];

  return {
    type: 'FeatureCollection',
    features: sourceData.map(({ name, data, ...measures }) => ({
      ...meta.locations[name].geoJson[0],
      id: meta.locations[name].geoJson[0].properties.code,
      properties: {
        ...meta.locations[name].geoJson[0].properties,
        measures,
        className: calculateColorStyle(Number.parseInt(data, 10)),
      },
    })),
  };
}

function calculateMinAndScaleForSourceData(sourceData: ChartDataB[]) {
  const { min, max } = sourceData.reduce(
    // eslint-disable-next-line no-shadow
    ({ min, max }, { data }) => {
      const dataVal = Number.parseInt(data, 10);
      return {
        min: dataVal < min ? dataVal : min,
        max: dataVal > max ? dataVal : max,
      };
    },
    { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
  );

  if (min === max) {
    return { min, scale: 0 };
  }

  const range = max - min;
  const scale = range / 5.0;
  return { min, scale };
}

function calculateSourceData(
  chartData: ChartDataB[],
  selectedDataSet: string,
): ChartDataB[] {
  return chartData
    .map(entry => ({ ...entry, data: entry[selectedDataSet] }))
    .filter(({ data }) => data !== undefined);
}

function generateGeometryAndLegendForSelectedOptions(
  meta: DataBlockMetadata,
  chartData: ChartDataB[],
  selectedDataSet: string,
) {
  const sourceData = calculateSourceData(chartData, selectedDataSet);

  const { min, scale } = calculateMinAndScaleForSourceData(sourceData);

  const legend: LegendEntry[] = [...Array(5)].map((_, idx) => {
    return {
      min: (min + idx * scale).toFixed(1),
      max: (min + (idx + 1) * scale).toFixed(1),
      idx,
    };
  });

  const geometry = getGeometryForOptions(meta, sourceData, min, scale);

  return { geometry, legend };
}

function registerResizingCheck(
  container: HTMLDivElement,
  callback: () => void,
): IntersectionObserver {
  const intersectionObserver = new IntersectionObserver(
    entries => {
      if (entries.length > 0) {
        if (entries[0].intersectionRatio > 0) {
          callback();
        }
      }
    },
    {
      threshold: 0.00001,
    },
  );

  intersectionObserver.observe(container);
  return intersectionObserver;
}

function getFeatureElementById(
  id: string,
  geometry?: FeatureCollection<Geometry, DataBlockGeoJsonProperties>,
): { element?: Element; layer?: Path; feature?: Feature } {
  if (geometry) {
    const selectedFeature = geometry.features.find(
      feature => feature.id === id,
    );

    if (selectedFeature) {
      const selectedLayer: Path = selectedFeature.properties.layer as Path;

      return {
        element: selectedLayer.getElement(),
        layer: selectedLayer,
        feature: selectedFeature,
      };
    }
  }

  return {};
}

const MapBlock = ({
  data,
  meta,
  position = { lat: 53.00986, lng: -3.2524038 },
  width,
  height,
  labels,
  axes,
}: MapProps) => {
  const mapRef = React.createRef<Map>();
  const geoJsonRef = React.createRef<GeoJSON>();
  const container = React.createRef<HTMLDivElement>();

  const [geometry, setGeometry] = React.useState<
    FeatureCollection<Geometry, DataBlockGeoJsonProperties>
  >();

  const [ukGeometry, setUkGeometry] = React.useState<FeatureCollection>();

  const intersectionObserver = React.useRef<IntersectionObserver>();

  const [dataSetOptions, setDataSetOptions] = React.useState<SelectOption[]>(
    axes.major.dataSets.map((dataSet, index) => {
      const dataKey = generateKeyFromDataSet(dataSet, axes.major.groupBy);

      return { ...labels[dataKey], value: index };
    }),
  );

  const [majorOptions, setMajorOptions] = React.useState<SelectOption[]>([]);

  const [legend, setLegend] = React.useState<LegendEntry[]>([]);

  const [selectedDataSetIndex, setSelectedDataSetIndex] = React.useState<
    number
  >();
  const [selectedDataSetKey, setSelectedDataSetKey] = React.useState<string>();

  const [selectedLocation, setSelectedLocation] = React.useState<string>('');

  const [results, setResults] = React.useState<IdValue[]>([]);

  const [chartData, setChartData] = React.useState<ChartDataB[]>([]);

  const updateGeojsonGeometry = (
    geoJson: FeatureCollection<Geometry, DataBlockGeoJsonProperties>,
  ) => {
    setGeometry(geoJson);

    if (geoJsonRef.current) {
      geoJsonRef.current.leafletElement.clearLayers();
      geoJsonRef.current.leafletElement.addData(geoJson);
    }
  };

  React.useEffect(() => {
    import('@common/services/UKGeoJson').then(imported => {
      setUkGeometry(imported.default);
    });

    if (data.result && data.result.length > 0) {
      setDataSetOptions(dataSetOptions);

      const generatedChartData = createDataForAxis(
        axes.major,
        data.result,
        meta,
      );
      setChartData(generatedChartData);


      const newSelectedDataSetIndex = 0;
      const selectedDataSet = axes.major.dataSets[newSelectedDataSetIndex];


      const selectedDataSetKeyV = generateKeyFromDataSet(selectedDataSet);

      console.log(JSON.stringify(data.result,null ,2));
      console.log(JSON.stringify(generatedChartData, null, 2));

      const {
        geometry: newGeometry,
        legend: newLegend,
      } = generateGeometryAndLegendForSelectedOptions(
        meta,
        generatedChartData,
        selectedDataSetKeyV,
      );

      updateGeojsonGeometry(newGeometry);

      setMajorOptions(getLocationsForDataSet(data, meta, chartData));
      setSelectedDataSetIndex(newSelectedDataSetIndex);
      setSelectedDataSetKey(selectedDataSetKeyV);
      setLegend(newLegend);
    }

    if (container.current) {
      intersectionObserver.current = registerResizingCheck(
        container.current,
        () => {
          if (mapRef.current) {
            const { current } = mapRef;
            requestAnimationFrame(() => {
              current.leafletElement.invalidateSize();
            });
          }
        },
      );
    }

    return () => {
      if (intersectionObserver.current !== undefined) {
        intersectionObserver.current.disconnect();
      }
    };
  }, []);

  const onSelectIndicator = (selectedDatasetIndex: number) => {
    const selectedDataSet = axes.major.dataSets[selectedDatasetIndex];
    const selectedDataSetKeyV = generateKeyFromDataSet(selectedDataSet);

    const {
      geometry: newGeometry,
      legend: newLegend,
    } = generateGeometryAndLegendForSelectedOptions(
      meta,
      chartData,
      selectedDataSetKeyV,
    );

    updateGeojsonGeometry(newGeometry);

    setLegend(newLegend);

    setMajorOptions(getLocationsForDataSet(data, meta, chartData));

    setSelectedDataSetIndex(selectedDatasetIndex);
    setSelectedDataSetKey(selectedDataSetKeyV);
  };

  function selectLocationOption(locationValue: string) {
    let calculatedResults: IdValue[] = [];

    const { element: currentSelectedLocationElement } = getFeatureElementById(
      selectedLocation,
      geometry,
    );

    if (currentSelectedLocationElement) {
      currentSelectedLocationElement.classList.remove(styles.selected);
    }

    const {
      layer: selectedLayer,
      element: selectedLocationElement,
      feature: selectedFeature,
    } = getFeatureElementById(locationValue, geometry);

    if (selectedLocationElement && selectedLayer && selectedFeature) {
      selectedLocationElement.classList.add(styles.selected);

      if (mapRef.current) {
        const polyLine: Polyline = selectedLayer as Polyline;

        mapRef.current.leafletElement.fitBounds(polyLine.getBounds(), {
          padding: [200, 200],
        });
        selectedLayer.bringToFront();
      }

      const { properties } = selectedFeature;

      if (properties) {
        // eslint-disable-next-line prefer-destructuring
        const measures: { [key: string]: string } = properties.measures;

        calculatedResults = Object.entries(measures).reduce(
          (r: IdValue[], [id, value]) => [...r, { id, value }],
          [],
        );
      }
    }

    setSelectedLocation(locationValue);

    setResults(calculatedResults);
  }

  const onEachFeature = (feature: MapFeature, featureLayer: Path) => {
    if (feature.properties) {
      // eslint-disable-next-line no-param-reassign
      feature.properties.layer = featureLayer;
    }

    featureLayer.setStyle({
      className: classNames(
        feature.properties && feature.properties.className,
        { [styles.selected]: feature.id === selectedLocation },
      ),
    });

    featureLayer.bindTooltip(() => {
      if (feature.properties) {
        const content = Object.entries(feature.properties.measures).map(
          ([id, value]) => `${labels[id].label} : ${value}${labels[id].unit}`,
        );

        if (feature.id) {
          content.unshift(
            `<strong>${(meta.locations || {})[feature.id].label}</strong>`,
          );
        }

        return content.join('<br />');
      }
      return '';
    });
  };

  const onClick = (e: MapClickEvent) => {
    const { feature } = e.sourceTarget;

    if (feature.properties) {
      selectLocationOption(feature.properties.code);
    }
  };

  if (
    data === undefined ||
    axes.major === undefined ||
    axes.major.dataSets === undefined ||
    axes.minor === undefined
  )
    return <div>An error occurred</div>;

  return (
    <div className="govuk-grid-row" ref={container}>
      <div
        className={classNames('govuk-grid-column-one-third')}
        aria-live="assertive"
      >
        <form>
          <div className="govuk-form-group govuk-!-margin-bottom-6">
            <FormSelect
              name="selectedIndicator"
              id="selectedIndicator"
              label="Select data to view"
              value={selectedDataSetIndex}
              onChange={e =>
                onSelectIndicator(Number.parseInt(e.currentTarget.value, 10))
              }
              options={dataSetOptions}
              order={[]}
            />
          </div>

          <div className="govuk-form-group govuk-!-margin-bottom-6">
            <FormSelect
              name="selectedLocation"
              id="selectedLocation"
              label="Select a location"
              value={selectedLocation}
              onChange={e => selectLocationOption(e.currentTarget.value)}
              options={majorOptions}
              order={[]}
            />
          </div>
        </form>

        {results.length > 0 ? (
          <div>
            {results.map(result => (
              <div
                key={result.id}
                className="dfe-dash-tiles__tile govuk-!-margin-bottom-6"
              >
                <h3 className="govuk-heading-m dfe-dash-tiles__heading">
                  {labels[result.id].label}
                </h3>
                <p
                  className="govuk-heading-xl govuk-!-margin-bottom-2"
                  aria-label={labels[result.id].label}
                >
                  <span>{` ${result.value}${labels[result.id].unit} `}</span>
                </p>
                <Details summary={`What is ${labels[result.id].label}?`}>
                  Description for {labels[result.id].label}
                </Details>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        {selectedDataSetKey && (
          <div>
            <h3 className="govuk-heading-s">
              Key to {labels[selectedDataSetKey].label}
            </h3>
            <dl className="govuk-list">
              {legend &&
                legend.map(({ min, max, idx }) => (
                  <dd className={styles.legend} key={idx}>
                    <span className={styles[`rate${idx}`]}>&nbsp;</span> {min}
                    {labels[selectedDataSetKey].unit}&nbsp; to {max}
                    {labels[selectedDataSetKey].unit}{' '}
                  </dd>
                ))}
            </dl>
          </div>
        )}
      </div>

      <div className={classNames('govuk-grid-column-two-thirds')}>
        <Map
          ref={mapRef}
          style={{
            width: (width && `${width}px`) || '100%',
            height: `${height || 600}px`,
          }}
          className={classNames(styles.map, 'dfe-print-break-avoid')}
          center={position}
          zoom={6.5}
        >
          {ukGeometry && <GeoJSON data={ukGeometry} className={styles.uk} />}

          {geometry && (
            <GeoJSON
              ref={geoJsonRef}
              data={geometry}
              onEachFeature={onEachFeature}
              style={(feature?: Feature) => ({
                className: classNames(
                  feature && feature.properties && feature.properties.className,
                  {
                    [styles.selected]:
                      selectedDataSetIndex &&
                      feature &&
                      feature.id ===
                        axes.major.dataSets[selectedDataSetIndex].location,
                  },
                ),
              })}
              onclick={onClick}
            />
          )}
        </Map>
      </div>
    </div>
  );
};

const definition: ChartDefinition = {
  type: 'map',
  name: 'Geographic',

  capabilities: {
    dataSymbols: false,
    stackable: false,
    lineStyle: false,
    gridLines: false,
    canSize: true,
  },

  data: [
    {
      type: 'geojson',
      title: 'Geographic',
      entryCount: 'multiple',
      targetAxis: 'geojson',
    },
  ],

  axes: [
    {
      id: 'geojson',
      title: 'geojson',
      type: 'major',
    },
  ],
};

MapBlock.definition = definition;

export default MapBlock;
