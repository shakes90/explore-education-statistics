import { ConfirmContextProvider } from '@common/context/ConfirmContext';
import mapValuesWithKeys from '@common/lib/utils/mapValuesWithKeys';
import tableBuilderService, {
  FilterOption,
  IndicatorOption,
  PublicationSubject,
  PublicationSubjectMeta,
  TableDataQuery,
  ThemeMeta,
} from '@common/modules/full-table/services/tableBuilderService';
import { Dictionary } from '@common/types/util';
import ButtonText from '@common/components/ButtonText';
import LinkContainer from '@common/components/LinkContainer';
import LoadingSpinner from '@common/components/LoadingSpinner';
import Link from '@frontend/components/Link';
import Page from '@frontend/components/Page';
import PreviousStepModalConfirm from '@common/modules/table-tool/components/PreviousStepModalConfirm';
import {
  CategoryFilter,
  Indicator,
  LocationFilter,
} from '@common/modules/full-table/types/filters';
import parseYearCodeTuple from '@common/modules/full-table/utils/TimePeriod';
import mapValues from 'lodash/mapValues';
import { NextContext } from 'next';
import React, { Component, MouseEventHandler, createRef } from 'react';
import getDefaultTableHeaderConfig from '@common/modules/full-table/utils/tableHeaders';
import permalinkService from '@common/modules/full-table/services/permalinkService';
import { FullTable } from '@common/modules/full-table/types/fullTable';
import { mapFullTable } from '@common/modules/full-table/utils/mapPermalinks';
import DownloadCsvButton from '@common/modules/table-tool/components/DownloadCsvButton';
import FiltersForm, {
  FilterFormSubmitHandler,
} from '@common/modules/table-tool/components/FiltersForm';
import LocationFiltersForm, {
  LocationFiltersFormSubmitHandler,
} from '@common/modules/table-tool/components/LocationFiltersForm';
import PublicationForm, {
  PublicationFormSubmitHandler,
} from '@common/modules/table-tool/components/PublicationForm';
import PublicationSubjectForm, {
  PublicationSubjectFormSubmitHandler,
} from '@common/modules/table-tool/components/PublicationSubjectForm';
import TableHeadersForm, {
  TableHeadersFormValues,
} from '@common/modules/table-tool/components/TableHeadersForm';
import TimePeriodDataTable from '@common/modules/table-tool/components/TimePeriodDataTable';
import TimePeriodForm, {
  TimePeriodFormSubmitHandler,
} from '@common/modules/table-tool/components/TimePeriodForm';
import mapOptionValues from '@common/modules/table-tool/components/utils/mapOptionValues';
import Wizard from '@common/modules/table-tool/components/Wizard';
import WizardStep from '@common/modules/table-tool/components/WizardStep';
import WizardStepHeading from '@common/modules/table-tool/components/WizardStepHeading';

export interface PublicationOptions {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    publications: {
      id: string;
      title: string;
      slug: string;
    }[];
  }[];
}

interface Props {
  themeMeta: ThemeMeta[];
  publicationId: string;
}

interface State {
  createdTable?: FullTable;
  startYear?: number;
  startCode?: string;
  endYear?: number;
  endCode?: string;
  locations: Dictionary<LocationFilter[]>;
  filters: Dictionary<CategoryFilter[]>;
  indicators: Indicator[];
  permalinkId: string;
  permalinkLoading: boolean;
  publication?: PublicationOptions['topics'][0]['publications'][0];
  subjects: PublicationSubject[];
  subjectId: string;
  subjectMeta: PublicationSubjectMeta;
  tableHeaders: TableHeadersFormValues;
}

class TableToolPage extends Component<Props, State> {
  public state: State = {
    filters: {},
    indicators: [],
    locations: {},
    permalinkId: '',
    permalinkLoading: false,
    subjectId: '',
    subjectMeta: {
      timePeriod: {
        hint: '',
        legend: '',
        options: [],
      },
      locations: {},
      indicators: {},
      filters: {},
    },
    subjects: [],
    tableHeaders: {
      columnGroups: [],
      columns: [],
      rowGroups: [],
      rows: [],
    },
  };

  private dataTableRef = createRef<HTMLTableElement>();

  public static async getInitialProps({ query }: NextContext) {
    const themeMeta = await tableBuilderService.getThemes();

    const publication = themeMeta
      .flatMap(option => option.topics)
      .flatMap(option => option.publications)
      .find(option => option.slug === query.publicationSlug);

    return {
      themeMeta,
      publicationId: publication ? publication.id : '',
    };
  }

  private handlePublicationFormSubmit: PublicationFormSubmitHandler = async ({
    publicationId,
  }) => {
    const { themeMeta } = this.props;
    const publication = themeMeta
      .flatMap(option => option.topics)
      .flatMap(option => option.publications)
      .find(option => option.id === publicationId);

    if (!publication) {
      return;
    }

    const { subjects } = await tableBuilderService.getPublicationMeta(
      publicationId,
    );

    this.setState({
      publication,
      subjects,
    });
  };

  private handlePublicationSubjectFormSubmit: PublicationSubjectFormSubmitHandler = async ({
    subjectId,
  }) => {
    const subjectMeta = await tableBuilderService.getPublicationSubjectMeta(
      subjectId,
    );

    this.setState({
      subjectMeta,
      subjectId,
    });
  };

  private handleLocationFiltersFormSubmit: LocationFiltersFormSubmitHandler = async ({
    locations,
  }) => {
    const { subjectId } = this.state;

    const subjectMeta = await tableBuilderService.filterPublicationSubjectMeta({
      ...locations,
      subjectId,
    });

    this.setState(prevState => ({
      subjectMeta: {
        ...prevState.subjectMeta,
        timePeriod: subjectMeta.timePeriod,
      },
      locations: mapValuesWithKeys(
        locations,
        (locationLevel, locationOptions) =>
          locationOptions
            .map(location =>
              prevState.subjectMeta.locations[locationLevel].options.find(
                option => option.value === location,
              ),
            )
            .filter(option => typeof option !== 'undefined')
            .map(
              option =>
                new LocationFilter(option as FilterOption, locationLevel),
            ),
      ),
    }));
  };

  private handleTimePeriodFormSubmit: TimePeriodFormSubmitHandler = async values => {
    const { subjectId, locations } = this.state;

    const [startYear, startCode] = parseYearCodeTuple(values.start);
    const [endYear, endCode] = parseYearCodeTuple(values.end);

    const subjectMeta = await tableBuilderService.filterPublicationSubjectMeta({
      ...mapValues(locations, locationLevel =>
        locationLevel.map(location => location.value),
      ),
      subjectId,
      timePeriod: {
        startYear,
        startCode,
        endYear,
        endCode,
      },
    });

    this.setState(prevState => ({
      startYear,
      startCode,
      endYear,
      endCode,
      subjectMeta: {
        ...prevState.subjectMeta,
        filters: subjectMeta.filters,
      },
    }));
  };

  private createQuery = (
    filters: Dictionary<CategoryFilter[]>,
    indicators: Indicator[],
  ): TableDataQuery => {
    const {
      subjectId,
      startYear,
      startCode,
      endYear,
      endCode,
      locations,
    } = this.state;

    if (!startYear || !startCode || !endYear || !endCode) {
      throw new Error('Missing required timePeriod parameters');
    }

    return {
      ...mapValues(locations, locationLevel =>
        locationLevel.map(location => location.value),
      ),
      subjectId,
      indicators: indicators.map(indicator => indicator.value),
      filters: Object.values(filters).flatMap(categoryFilters =>
        categoryFilters.flatMap(filter => filter.value),
      ),
      timePeriod: {
        startYear,
        startCode,
        endYear,
        endCode,
      },
    };
  };

  private handleFiltersFormSubmit: FilterFormSubmitHandler = async values => {
    const { startYear, startCode, endYear, endCode, subjectMeta } = this.state;

    if (!startYear || !startCode || !endYear || !endCode) {
      return;
    }

    const filtersByValue = mapValues(subjectMeta.filters, value =>
      mapOptionValues(value.options),
    );

    const indicatorsByValue = mapOptionValues<IndicatorOption>(
      subjectMeta.indicators,
    );

    const filters = mapValuesWithKeys(
      values.filters,
      (filterGroup, selectedFilters) =>
        selectedFilters.map(
          filter =>
            new CategoryFilter(
              filtersByValue[filterGroup][filter],
              filter === subjectMeta.filters[filterGroup].totalValue,
            ),
        ),
    );

    const indicators = values.indicators.map(
      indicator => new Indicator(indicatorsByValue[indicator]),
    );

    const unmappedCreatedTable = await tableBuilderService.getTableData(
      this.createQuery(filters, indicators),
    );

    const createdTable = mapFullTable(unmappedCreatedTable);

    this.setState({
      createdTable,
      filters,
      indicators,
      permalinkId: '',
      tableHeaders: getDefaultTableHeaderConfig(createdTable.subjectMeta),
    });
  };

  private handlePermalinkClick: MouseEventHandler = async () => {
    const { filters, indicators, tableHeaders } = this.state;
    this.setState({ permalinkLoading: true });

    const { id: permalinkId } = await permalinkService.createTablePermalink({
      ...this.createQuery(filters, indicators),
      configuration: {
        tableHeadersConfig: tableHeaders,
      },
    });

    this.setState({
      permalinkId,
      permalinkLoading: false,
    });

    // Router.push(`${window.location.pathname}/permalink/${permalinkId}`);
  };

  public render() {
    const { themeMeta, publicationId } = this.props;
    const {
      createdTable,
      publication,
      permalinkId,
      permalinkLoading,
      subjectMeta,
      subjects,
      tableHeaders,
    } = this.state;

    return (
      <Page title="Create your own tables online" caption="Table Tool" wide>
        <p>
          Choose the data and area of interest you want to explore and then use
          filters to create your table.
        </p>

        <p>
          Once you've created your table, you can download the data it contains
          for your own offline analysis.
        </p>

        <ConfirmContextProvider>
          {({ askConfirm }) => (
            <>
              <Wizard
                id="tableTool-steps"
                onStepChange={async (nextStep, previousStep) => {
                  if (nextStep < previousStep) {
                    const confirmed = await askConfirm();
                    return confirmed ? nextStep : previousStep;
                  }

                  return nextStep;
                }}
              >
                <WizardStep>
                  {stepProps => (
                    <PublicationForm
                      {...stepProps}
                      publicationId={publicationId}
                      publicationTitle={publication ? publication.title : ''}
                      options={themeMeta}
                      onSubmit={this.handlePublicationFormSubmit}
                    />
                  )}
                </WizardStep>
                <WizardStep>
                  {stepProps => (
                    <PublicationSubjectForm
                      {...stepProps}
                      options={subjects}
                      onSubmit={this.handlePublicationSubjectFormSubmit}
                    />
                  )}
                </WizardStep>
                <WizardStep>
                  {stepProps => (
                    <LocationFiltersForm
                      {...stepProps}
                      options={subjectMeta.locations}
                      onSubmit={this.handleLocationFiltersFormSubmit}
                    />
                  )}
                </WizardStep>
                <WizardStep>
                  {stepProps => (
                    <TimePeriodForm
                      {...stepProps}
                      options={subjectMeta.timePeriod.options}
                      onSubmit={this.handleTimePeriodFormSubmit}
                    />
                  )}
                </WizardStep>
                <WizardStep>
                  {stepProps => (
                    <FiltersForm
                      {...stepProps}
                      onSubmit={this.handleFiltersFormSubmit}
                      subjectMeta={subjectMeta}
                    />
                  )}
                </WizardStep>
                <WizardStep>
                  {stepProps => (
                    <>
                      <WizardStepHeading {...stepProps}>
                        Explore data
                      </WizardStepHeading>

                      <div className="govuk-!-margin-bottom-4">
                        <TableHeadersForm
                          initialValues={tableHeaders}
                          onSubmit={tableHeaderConfig => {
                            this.setState({
                              tableHeaders: tableHeaderConfig,
                              permalinkId: '',
                            });

                            if (this.dataTableRef.current) {
                              this.dataTableRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                              });
                            }
                          }}
                        />
                        {createdTable ? (
                          <TimePeriodDataTable
                            ref={this.dataTableRef}
                            fullTable={createdTable}
                            tableHeadersConfig={tableHeaders}
                          />
                        ) : null}
                      </div>

                      {publication && createdTable && (
                        <>
                          <h3>Share your table</h3>
                          <ul className="govuk-list">
                            <li>
                              {permalinkId ? (
                                <>
                                  <div>Generated permanent link:</div>
                                  <LinkContainer
                                    url={`${window.location.host}/data-tables/permalink/${permalinkId}`}
                                  />
                                  <div>
                                    <a
                                      className="govuk-link"
                                      href={`/data-tables/permalink/${permalinkId}`}
                                      title="View created table permalink"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View permanent link
                                    </a>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {permalinkLoading ? (
                                    <>
                                      Generating permanent link
                                      <LoadingSpinner inline size={19} />
                                    </>
                                  ) : (
                                    <ButtonText
                                      disabled={permalinkLoading}
                                      onClick={this.handlePermalinkClick}
                                    >
                                      Generate permanent link
                                    </ButtonText>
                                  )}
                                </>
                              )}
                            </li>
                          </ul>

                          <h3>Additional options</h3>

                          <ul className="govuk-list">
                            <li>
                              <Link
                                as={`/find-statistics/${publication.slug}`}
                                to={`/find-statistics/publication?publication=${publication.slug}`}
                              >
                                Go to publication
                              </Link>
                            </li>
                            <li>
                              <DownloadCsvButton
                                publicationSlug={publication.slug}
                                fullTable={createdTable}
                              />
                            </li>

                            <li>
                              <a href="#api">Access developer API</a>
                            </li>
                            <li>
                              <Link
                                as={`/methodology/${publication.slug}`}
                                to={`/methodology/methodology?methodology=${publication.slug}`}
                              >
                                Go to methodology
                              </Link>
                            </li>
                          </ul>
                          <p className="govuk-body">
                            If you have a question about the data or methods
                            used to create this table contact the named
                            statistician via the relevant release page.
                          </p>
                        </>
                      )}
                    </>
                  )}
                </WizardStep>
              </Wizard>

              <PreviousStepModalConfirm />
            </>
          )}
        </ConfirmContextProvider>
      </Page>
    );
  }
}

export default TableToolPage;