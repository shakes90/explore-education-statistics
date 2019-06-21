import { User } from '@admin/services/PrototypeLoginService';

export interface Methodology {
  id: string;
  title: string;
}

export interface Theme {
  id: string;
  title: string;
}

export interface Topic {
  id: string;
  title: string;
  theme: Theme;
}

export interface TimePeriod {
  id: string;
  title: string;
}

export interface TimePeriodCoverage {
  label: string;
  academicYear?: {
    yearStarting: number;
    timePeriod: TimePeriod;
    termsPerYear: number;
  };
  calendarYear?: {
    year: number;
  };
  financialYear?: {
    startDate: Date;
    timePeriod: TimePeriod;
  };
  month?: {
    monthlyReleaseDate: Date;
  };
}

export enum ApprovalStatus {
  Approved,
  ReadyToReview,
}

export interface ReleaseStatus {
  approvalStatus: ApprovalStatus;
  isNew: boolean;
  isLive: boolean;
  isLatest: boolean;
  lastEdited: Date;
  lastEditor: User;
  published: Date;
  nextRelease: Date;
}

export interface ReleaseDataType {
  id: string;
  title: string;
}

export interface ReleaseMeta {
  lead: TeamContact;
  editing: boolean;
  review: boolean;
  showComments: boolean;
  dataType: ReleaseDataType;
}

export interface Release {
  id: string;
  releaseName: string;
  timePeriodCoverage: TimePeriodCoverage;
  slug: string;
  status: ReleaseStatus;
  meta: ReleaseMeta;
}

export interface LegacyRelease {
  id: string;
  description: string;
  url: string;
}

export interface TeamContact {
  teamName: string;
  teamEmail: string;
  contactName: string;
  contactTelNo: string;
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  description: string;
  dataSource: string;
  summary: string;
  nextUpdate: string;
  releases: Release[];
  legacyReleases: LegacyRelease[];
  topic: Topic;
  contact: TeamContact;
  methodology: Methodology;
}
