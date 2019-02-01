import React, { Component, ReactEventHandler } from 'react';

import 'leaflet/dist/leaflet.css';

import styles from './PrototypeMap.module.scss';

import { Boundaries } from './PrototypeMapBoundaries';

import { Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import { GeoJSON, Map } from 'react-leaflet';

export interface PrototypeMapProps {
  OnFeatureSelect?: any;
}

class PrototypeMap extends Component<PrototypeMapProps> {
  public static defaultProps: Partial<PrototypeMapProps> = {
    OnFeatureSelect: undefined,
  };

  public render() {
    const { OnFeatureSelect } = this.props;

    const position = {
      lat: 53.009865,
      lng: -3.2524038,
    };

    let mapNode: any;

    const i = () => mapNode.leafletElement.invalidateSize();

    // force a refresh to fix a bug
    requestAnimationFrame(i);

    // @ts-ignore
    const onEachFeature = (f, layer) => {
      // @ts-ignore
      layer.bindTooltip(f.properties.lad17nm, {
        // className: f.properties.toolTipClass,
        direction: 'center',
        opacity: 1.0,
      });
    };

    // @ts-ignore
    const click = (e: any) => {
      if (e.sourceTarget.feature) {
        //  && props.onClickFeature) {

        if (OnFeatureSelect) {
          OnFeatureSelect(e.sourceTarget.feature.properties);
        }
      }
    };

    const styleFeature = (f: any) => {
      return { className: f.properties && f.properties.className };
    };

    /**
     * lad17cd - code
     * lad17nm - name
     */
    const data = {
      ...Boundaries,
      features: Boundaries.features.filter(g => {
        return g.properties !== null && g.properties.lad17cd[0] === 'E';
      }),
    } as FeatureCollection;

    const minOverall = data.features.reduce(
      (min, next) =>
        next.properties && next.properties.absence.overall < min
          ? next.properties.absence.overall
          : min,
      100,
    );
    const maxOverall = data.features.reduce(
      (max, next) =>
        next.properties && next.properties.absence.overall > max
          ? next.properties.absence.overall
          : max,
      0,
    );

    const range = (maxOverall - minOverall) / 5;

    data.features = data.features.map(feature => {
      if (feature.properties) {
        const rate = Math.trunc(
          (feature.properties.absence.overall - minOverall) / range,
        );
        feature.properties.className = styles[`rate${rate}`];
      }

      return feature;
    });

    return (
      <div>
        <Map
          ref={(n: any) => (mapNode = n)}
          center={position}
          className={styles.map}
          zoom={6}
        >
          <GeoJSON
            data={data}
            onEachFeature={onEachFeature}
            style={styleFeature}
            onClick={click}
          />
        </Map>
      </div>
    );
  }
}

export default PrototypeMap;
