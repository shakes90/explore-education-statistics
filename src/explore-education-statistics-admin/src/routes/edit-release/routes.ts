import ReleaseSummaryEditPage from '@admin/pages/release/edit-release/summary/ReleaseSummaryEditPage';
import ReleaseSummaryPage from '@admin/pages/release/edit-release/summary/ReleaseSummaryPage';
import ReleaseDataPage from '@admin/pages/release/edit-release/data/ReleaseDataPage';
import ReleaseBuildTablesPage from '@admin/pages/release/edit-release/ReleaseBuildTablesPage';
import ReleaseTablesPage from '@admin/pages/release/edit-release/ReleaseTablesPage';
import ReleaseContentPage from '@admin/pages/release/edit-release/ReleaseContentPage';
import ReleasePublishStatusPage from '@admin/pages/release/edit-release/ReleasePublishStatusPage';
import ReleaseManageDataBlocksPage from '@admin/pages/release/edit-release/ReleaseManageDataBlocksPage';

export interface ReleaseRoute {
  path: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  component: (props: any) => JSX.Element;
  title: string;
  generateLink: (publicationId: string, releaseId: string) => string;
}

const createReadonlyRoute = (
  section: string,
  title: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  component: (props: any) => JSX.Element,
): ReleaseRoute => {
  const path = `/publication/:publicationId/release/:releaseId/${section}`;
  return {
    path,
    component,
    title,
    generateLink: (publicationId: string, releaseId: string) =>
      path
        .replace(':publicationId', publicationId)
        .replace(':releaseId', releaseId),
  };
};

const createEditRoute = (
  section: string,
  title: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  component: (props: any) => JSX.Element,
): ReleaseRoute => {
  const path = `/publication/:publicationId/release/:releaseId/${section}/edit`;
  return {
    path,
    component,
    title,
    generateLink: (publicationId: string, releaseId: string) =>
      path
        .replace(':publicationId', publicationId)
        .replace(':releaseId', releaseId),
  };
};

export const summaryRoute = createReadonlyRoute(
  'summary',
  'Release summary',
  ReleaseSummaryPage,
);
export const dataRoute = createReadonlyRoute(
  'data',
  'Add / edit data',
  ReleaseDataPage,
);
export const manageDataBlocksRoute = createReadonlyRoute(
  'manage-datablocks',
  'Manage data blocks',
  ReleaseManageDataBlocksPage,
);
export const buildTablesRoute = createReadonlyRoute(
  'build-tables',
  'Build tables',
  ReleaseBuildTablesPage,
);
export const tablesRoute = createReadonlyRoute(
  'tables',
  'View / edit tables',
  ReleaseTablesPage,
);
export const contentRoute = createReadonlyRoute(
  'content',
  'Add / edit content',
  ReleaseContentPage,
);
export const publishStatusRoute = createReadonlyRoute(
  'publish-status',
  'Set publish status',
  ReleasePublishStatusPage,
);
export const summaryEditRoute = createEditRoute(
  'summary',
  'Release summary',
  ReleaseSummaryEditPage,
);
export const dataEditRoute = createEditRoute(
  'data',
  'Add / edit data',
  ReleaseDataPage,
);
export const buildTablesEditRoute = createEditRoute(
  'build-tables',
  'Build tables',
  ReleaseBuildTablesPage,
);
export const manageDataBlocksEditRoute = createEditRoute(
  'manage-datablocks',
  'Manage data blocks',
  ReleaseManageDataBlocksPage,
);
export const tablesEditRoute = createEditRoute(
  'tables',
  'View / edit tables',
  ReleaseTablesPage,
);
export const contentEditRoute = createEditRoute(
  'content',
  'Add / edit content',
  ReleaseContentPage,
);
export const publishStatusEditRoute = createEditRoute(
  'publish-status',
  'Set publish status',
  ReleasePublishStatusPage,
);

export const viewRoutes = [
  summaryRoute,
  dataRoute,
  manageDataBlocksRoute,
  buildTablesRoute,
  tablesRoute,
  contentRoute,
  publishStatusRoute,
];

export const editRoutes = [
  summaryEditRoute,
  dataEditRoute,
  manageDataBlocksEditRoute,
  buildTablesEditRoute,
  tablesEditRoute,
  contentEditRoute,
  publishStatusEditRoute,
];

export default {
  manageReleaseRoutes: [...viewRoutes, ...editRoutes],
  createReleaseRoute: {
    route: '/publication/:publicationId/create-release',
    generateLink: (publicationId: string) =>
      `/publication/${publicationId}/create-release`,
  },
};
