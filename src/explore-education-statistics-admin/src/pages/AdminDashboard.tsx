import AdminDashboardApprovedForPublication from '@admin/pages/prototypes/components/AdminDashboardApprovedForPublication';
import AdminDashboardNeedsWork from '@admin/pages/prototypes/components/AdminDashboardNeedsWork';
import AdminDashboardPublications from '@admin/pages/prototypes/components/AdminDashboardPublications';
import AdminDashboardReadyForApproval from '@admin/pages/prototypes/components/AdminDashboardReadyForApproval';
import RelatedInformation from '@common/components/RelatedInformation';
import Tabs from '@common/components/Tabs';
import TabsSection from '@common/components/TabsSection';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { LoginContext } from '@admin/components/Login';
import { Authentication, User } from '@admin/services/PrototypeLoginService';
import Link from '../components/Link';
import Page from '../components/Page';

const BrowseReleasesPage = ({ location }: RouteChildrenProps) => {
  return (
    <Page wide breadcrumbs={[{ name: 'Administrator dashboard' }]}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <LoginContext.Consumer>
            {loginContext =>
              loginContext.user ? (
                <UserGreeting user={loginContext.user} />
              ) : null
            }
          </LoginContext.Consumer>
        </div>
        <div className="govuk-grid-column-one-third">
          <RelatedInformation heading="Help and guidance">
            <ul className="govuk-list">
              <li>
                <Link to="/prototypes/methodology-home">
                  Administrators' guide{' '}
                </Link>
              </li>
            </ul>
          </RelatedInformation>
        </div>
      </div>
      <Tabs>
        <TabsSection id="publications" title="Publications">
          <AdminDashboardPublications />
        </TabsSection>
        <TabsSection
          id="task-ready-approval1"
          title={`Ready to review ${
            location.search === '?status=readyApproval' ? '(1)' : ''
          }`}
        >
          <AdminDashboardReadyForApproval />
        </TabsSection>
        <TabsSection id="task-ready-approval2" title="Needs work">
          <AdminDashboardNeedsWork />
        </TabsSection>
        <TabsSection id="task-ready-approval3" title="Approved for publication">
          <AdminDashboardApprovedForPublication />
        </TabsSection>
      </Tabs>
    </Page>
  );
};

const UserGreeting = ({ user }: Authentication) => (
  <>
    <span className="govuk-caption-xl">Welcome</span>

    <h1 className="govuk-heading-xl">
      {user ? user.name : ''}{' '}
      <span className="govuk-body-s">
        Not you? <Link to="#">Sign out</Link>
      </span>
    </h1>
  </>
);

export default BrowseReleasesPage;
