import { Dictionary, PartialRecord, KeysRemap } from '@common/types';
import { FullTable } from '@common/modules/full-table/types/fullTable.ts';
import { dataApi } from '@common/services/api';

export interface FilterOption {
  label: string;
  value: string;
}

export interface IndicatorOption extends FilterOption {
  unit: string;
}

export interface TimePeriodOption {
  code: string;
  label: string;
  year: number;
}

export interface GroupedFilterOptions {
  [groupKey: string]: {
    label: string;
    options: FilterOption[];
  };
}

export interface ThemeMeta {
  id: string;
  title: string;
  slug: string;
  topics: {
    id: string;
    title: string;
    slug: string;
    publications: {
      id: string;
      title: string;
      slug: string;
    }[];
  }[];
}

export interface PublicationSubject {
  id: string;
  label: string;
}

export interface PublicationMeta {
  publicationId: string;
  subjects: PublicationSubject[];
}

export interface ReleaseMeta {
  releaseId: string;
  subjects: PublicationSubject[];
}

export interface PublicationSubjectMeta {
  filters: Dictionary<{
    legend: string;
    hint?: string;
    options: GroupedFilterOptions;
    totalValue?: string;
  }>;
  indicators: Dictionary<{
    label: string;
    options: IndicatorOption[];
  }>;
  locations: Dictionary<{
    legend: string;
    hint?: string;
    options: FilterOption[];
  }>;
  timePeriod: {
    hint?: string;
    legend: string;
    options: TimePeriodOption[];
  };
}

export type LocationLevelKeys =
  | 'country'
  | 'institution'
  | 'localAuthority'
  | 'localAuthorityDistrict'
  | 'localEnterprisePartnership'
  | 'multiAcademyTrust'
  | 'mayoralCombinedAuthority'
  | 'opportunityArea'
  | 'parliamentaryConstituency'
  | 'region'
  | 'rscRegion'
  | 'sponsor'
  | 'ward';

export interface TimePeriodQuery {
  startYear: number;
  startCode: string;
  endYear: number;
  endCode: string;
}

export const LocationLevelKeysEnum: KeysRemap<LocationLevelKeys, boolean> = {
  country: true,
  institution: true,
  localAuthority: true,
  localAuthorityDistrict: true,
  localEnterprisePartnership: true,
  mayoralCombinedAuthority: true,
  multiAcademyTrust: true,
  opportunityArea: true,
  parliamentaryConstituency: true,
  region: true,
  rscRegion: true,
  sponsor: true,
  ward: true,
};

export const LocationLevelKeysNames = Object.keys(LocationLevelKeysEnum);

export type TableDataQuery = {
  publicationId?: string;
  subjectId: string;
  filters: string[];
  indicators: string[];
  timePeriod?: TimePeriodQuery;
  geographicLevel?: string;
} & PartialRecord<LocationLevelKeys, string[]>;

export default {
  getThemes(): Promise<ThemeMeta[]> {
    return dataApi.get(`/meta/themes`);
  },
  getPublicationMeta(publicationUuid: string): Promise<PublicationMeta> {
    return dataApi.get(`/meta/publication/${publicationUuid}`);
  },
  getReleaseMeta(releaseUuid: string): Promise<ReleaseMeta> {
    return dataApi.get(`/meta/release/${releaseUuid}`);
  },
  getPublicationSubjectMeta(
    subjectId: string,
  ): Promise<PublicationSubjectMeta> {
    return dataApi.get(`/meta/subject/${subjectId}`);
  },
  filterPublicationSubjectMeta(
    query: {
      subjectId: string;
      timePeriod?: TimePeriodQuery;
      geographicLevel?: string;
    } & PartialRecord<LocationLevelKeys, string[]>,
  ): Promise<PublicationSubjectMeta> {
    return dataApi.post('/meta/subject', query);
  },
  getTableData(query: TableDataQuery): Promise<FullTable> {
    return dataApi.post('/tablebuilder', query);
  },
  getTableDataForRelease(
    query: TableDataQuery,
    releaseId: string,
  ): Promise<FullTable> {
    return dataApi.post(`/tablebuilder?releaseId=${releaseId}`, query);
  },
};
