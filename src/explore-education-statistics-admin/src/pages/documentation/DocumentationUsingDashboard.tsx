import React from 'react';
import { RouteChildrenProps } from 'react-router';
import Page from '@admin/components/Page';
import StepNav from './components/StepByStep';
import StepNavItem from './components/StepByStepItem';

const DocumentationCreateNewRelease = ({ location: _ }: RouteChildrenProps) => {
  const query = new URLSearchParams(window.location.search);
  const step = Number(query.get('step'));

  return (
    <Page
      wide
      breadcrumbs={[
        { name: "Administrator's guide", link: '/documentation' },
        { name: 'Using your administration dashboard' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters">
          <div className="app-content__header">
            <span className="govuk-caption-xl">Step by step guidance</span>
            <h1 className="govuk-heading-xl">
              Using your administration dashboard
            </h1>
          </div>
          <p>
            How to use your administration dashboard to manage publications,
            releases and methodology.
          </p>

          <StepNav>
            <StepNavItem stepNumber={1} stepHeading="Step 1" open={step === 1}>
              <p>Write standard html here</p>
            </StepNavItem>
            <StepNavItem stepNumber={2} stepHeading="Step 2" open={step === 2}>
              <p>Write standard html here</p>
            </StepNavItem>
            <StepNavItem stepNumber={3} stepHeading="Step 3" open={step === 3}>
              <p>Write standard html here</p>
            </StepNavItem>
            <StepNavItem stepNumber={4} stepHeading="Step 4" open={step === 4}>
              <p>Write standard html here</p>
            </StepNavItem>
          </StepNav>
        </div>
      </div>
    </Page>
  );
};

export default DocumentationCreateNewRelease;