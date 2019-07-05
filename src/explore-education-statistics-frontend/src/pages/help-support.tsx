import Page from '@frontend/components/Page';
import React from 'react';

function HelpSupportPage() {
  return (
    <Page title="Help and support">
      <p>
        Find out more about explore education statistics - including how to use
        it services and get further help and support.
      </p>
      <h2>About the service</h2>
      <p>
        Explore education statistics has been built by{' '}
        <a href="https://www.gov.uk/government/organisations/department-for-education">
          the Department for Education (DfE)
        </a>{' '}
        to make it easier for you to find, access, navigate and understand the
        range of education-related statistics and data it provides.
      </p>
      <p>
        We will be adding and publishing more of the official statistics and
        data DfE collects on schools, further and higher education and children
        and young people to the service as and when they are officially released
        by DfE.
      </p>
      <p>
        All the statistics and data published this service are produced in line
        with the UK Statistical Authority's{' '}
        <a href="https://www.statisticsauthority.gov.uk/code-of-practice/">
          Code of Practice for Official Statistics
        </a>{' '}
        and DfE's{' '}
        <a href="https://www.gov.uk/government/publications/standards-for-official-statistics-published-by-the-department-for-education">
          Standards for official statistics
        </a>
        .
      </p>
      <h2>Find statistics and data</h2>
      The service does not currently contain all of DfE's official statistics
      and data and more will be added as and when they are officially released
      by DfE.
      <p>
        To find specific sets of statistics currently published via the service
        and links to those which can still be found on the{' '}
        <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics">
          Statistics at DfE
        </a>{' '}
        pages GOV.UK browse our
        <a href="/statistics">Find statistics and data</a> section.
      </p>
      <p>
        You can also download data files of those statistics currently published
        via the service through our <a href="/download">Download data files</a>{' '}
        section.
      </p>
      <p>
        These files are currently only available in csv format but other formats
        will be made available in the future.
      </p>
      <p>
        However, to download data files of those statistics not yet currently
        available through the service you'll need to visit the{' '}
        <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics">
          Statistics at DfE
        </a>{' '}
        pages GOV.UK.
      </p>
      <p>
        To find out about the methodology behind the specific statistics and
        data set currently published via the service and how and why they're
        collected and published browse our{' '}
        <a href="/methodologies">Education statistics: methodology</a> section.
      </p>
      <p>
        For a list of definitions and terms used across education statistics and
        data visit our <a href="/glossary">Education statistics: glossary</a>{' '}
        section.
      </p>
      <h2>Creating and downloading data tables</h2>
      <p>
        To create your own tables and explore the national and regional data we
        have available via the service use the table tool available in our{' '}
        <a href="/table-tool">Create your own tables online</a> section.
      </p>
      <p>
        You can use our table tool to choose the data and area of statistical
        interest you want to explore and then use filters to create your table.
      </p>
      <p>
        Once you've created your table, you can download the data it contains
        for your own offline analysis.
      </p>
      <h2>Sign up for email alerts</h2>
      <p>
        You can sign up to receive emails when new statistics and data are
        released and published through our service.
      </p>
      <p>
        Sign up by selecting the 'Sign up for email alerts' link found at the
        top of the pages found under{' '}
        <a href="/statistics">Find statistics and data</a>
      </p>
      <p>
        You'll then be sent an email alert with a link to the latest statistical
        and data release which you have chosen to be updated about.
      </p>
      <p>
        You can unsubscribe at any time by selecting the ‘unsubscribe’ links in
        the email alerts you receive or in the original confirmation email which
        you were sent.
      </p>
      <h2>Contact us for help and support</h2>
      <p>
        If you have any technical issues using the service contact our Explore
        Education Statistics team:
      </p>
      <p className="govuk-hint">
        For example, problems downloading any data files or using our table tool
      </p>
      <div className="govuk-inset-text">
        <p className="govuk-!-margin-top-0">
          Email:{' '}
          <a href="mailto:explore.statistics@education.gov.uk">
            explore.statistics@education.gov.uk
          </a>
        </p>
      </div>
      <p>
        If you have any specific statistical or subject-related queries, contact
        the team or named statistician listed in the 'Contact us' sections of
        the pages found under <a href="/statistics">Find statistics and data</a>
        .
      </p>
    </Page>
  );
}

export default HelpSupportPage;
