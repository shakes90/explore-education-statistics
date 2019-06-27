import Accordion from '@common/components/Accordion';
import AccordionSection from '@common/components/AccordionSection';
import Details from '@common/components/Details';
import PrototypeMap from '@common/prototypes/publication/components/PrototypeMap';
import Link from '@frontend/components/Link';
import PrototypePage from '@frontend/prototypes/components/PrototypePage';
import React from 'react';
import PrototypeAbsenceData from './components/PrototypeAbsenceData';
import PrototypeDataSample from './components/PrototypeDataSample';

const PublicationPage = () => {
  let mapRef: PrototypeMap | null = null;

  return (
    <PrototypePage
      breadcrumbs={[
        {
          link: '/prototypes/browse-releases-find',
          text: 'Find statistics and download data',
        },
        { text: 'Absence statistics for schools in England', link: '#' },
      ]}
    >
      <strong className="govuk-tag govuk-!-margin-bottom-2">
        {' '}
        Latest statistics and data{' '}
      </strong>
      <h1 className="govuk-heading-xl">Apprenticeship and levy statistics</h1>
      <dl className="dfe-meta-content">
        <dt className="govuk-caption-m">Published: </dt>
        <dd>
          <strong>22 March 2018</strong>
        </dd>
      </dl>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-three-quarters">
              <p className="govuk-body">
                Read national statistical summaries, view charts and tables and
                download data files.
              </p>
            </div>
          </div>

          <Details summary="Download data files">
            <ul className="govuk-list">
              <li>
                <a href="#" className="govuk-link">
                  Download data file 1 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 2 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 3 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 4 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 5 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 6 (.csv)
                </a>
              </li>
              <li>
                <a href="#" className="govuk-link">
                  Download data file 7 (.csv)
                </a>
              </li>
            </ul>
          </Details>
        </div>

        <div className="govuk-grid-column-one-third">
          <aside className="app-related-items">
            <h2 className="govuk-heading-m" id="subsection-title">
              About these statistics
            </h2>

            <h3 className="govuk-heading-s govuk-!-margin-bottom-0">
              <span className="govuk-caption-m govuk-caption-inline">
                For academic year:{' '}
              </span>
              2017/18
            </h3>

            <Details summary="See previous 7 releases">
              <ul className="govuk-list">
                <li>
                  <a
                    className="govuk-link"
                    href="/themes/schools/absence-and-exclusions/pupil-absence-in-schools-in-england/2015-16"
                  >
                    2015 to 2016
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-2014-to-2015">
                    2014 to 2015
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-2013-to-2014">
                    2013 to 2014
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-2012-to-2013">
                    2012 to 2013
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-including-pupil-characteristics">
                    2011 to 2012
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-including-pupil-characteristics-academic-year-2010-to-2011">
                    2010 to 2011
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-including-pupil-characteristics-academic-year-2009-to-2010">
                    2009 to 2010
                  </a>
                </li>
              </ul>
            </Details>

            <h3 className="govuk-heading-s govuk-!-margin-bottom-0">
              <span className="govuk-caption-m">Last updated: </span>20 June
              2018
            </h3>

            <Details summary="See all 2 updates">
              <div data-testid="publication-page--update-element">
                <h3 className="govuk-heading-s">19 April 2017</h3>
                <p>
                  Underlying data file updated to include absence data by pupil
                  residency and school location, andupdated metadata document.
                </p>
              </div>
              <div data-testid="publication-page--update-element">
                <h3 className="govuk-heading-s">22 March 2017</h3>
                <p>First published.</p>
              </div>
            </Details>
            <h2
              className="govuk-heading-m govuk-!-margin-top-6"
              id="related-content"
            >
              Related guidance
            </h2>
            <nav role="navigation" aria-labelledby="related-content">
              <ul className="govuk-list">
                <li>
                  <Link to="/prototypes/methodology-absence">
                    Apprenticeship and levy statistics: methodology
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
      <hr />
      <h2 className="govuk-heading-l">
        Headline facts and figures - 2017/18 academic year
      </h2>
      <PrototypeDataSample
        sectionId="headlines"
        chartTitle="change in absence types in England"
        xAxisLabel="School Year"
        yAxisLabel="Absence Rate"
        chartData={[
          {
            authorised: 4.2,
            name: '2012/13',
            overall: 5.3,
            unauthorised: 1.1,
          },
          {
            authorised: 3.5,
            name: '2013/14',
            overall: 4.5,
            unauthorised: 1.1,
          },
          {
            authorised: 3.5,
            name: '2014/15',
            overall: 4.6,
            unauthorised: 1.1,
          },
          {
            authorised: 3.4,
            name: '2015/16',
            overall: 4.6,
            unauthorised: 1.1,
          },
          {
            authorised: 3.4,
            name: '2016/17',
            overall: 4.7,
            unauthorised: 1.3,
          },
        ]}
        chartDataKeys={['unauthorised', 'authorised', 'overall']}
      />

      <Accordion id="contents-sections">
        <AccordionSection heading="Overview">
          <PrototypeDataSample
            sectionId="absenceRates"
            chartTitle="absence rates in England"
            xAxisLabel="School Year"
            yAxisLabel="Absence Rate"
            chartData={[
              {
                name: '2012/13',
                primary: 4.7,
                'primary and secondary': 5.9,
                secondary: 7.3,
              },
              {
                name: '2013/14',
                primary: 3.9,
                'primary and secondary': 4.3,
                secondary: 5.0,
              },
              {
                name: '2014/15',
                primary: 4.6,
                'primary and secondary': 5.8,
                secondary: 7.1,
              },
              {
                name: '2015/16',
                primary: 3.8,
                'primary and secondary': 4.0,
                secondary: 4.6,
              },
              {
                name: '2016/17',
                primary: 4.7,
                'primary and secondary': 5.8,
                secondary: 7.1,
              },
            ]}
            chartDataKeys={['primary', 'secondary', 'primary and secondary']}
          />
          <p>
            The overall absence rate across state-funded primary, secondary and
            special schools increased from 4.6% in 2015/16 to 4.7% in 2016/17.
          </p>
          <p>
            In primary schools the overall absence rate stayed the same at 4%
            and the rate in secondary schools increased from 5.2% to 5.4%.
          </p>
          <p>Absence in special schools is much higher at 9.7% in 2016/17.</p>
          <p>
            The increase in overall absence rate has been driven by an increase
            in the unauthorised absence rate across state-funded primary,
            secondary and special schools - which increased from 1.1% to 1.3%
            between 2015/16 and 2016/17.
          </p>
          <p>
            Looking at longer-term trends - overall and authorised absence rates
            have been fairly stable over recent years after decreasing gradually
            between 2006/07 and 2013/14.
          </p>
          <p>
            Unauthorised absence rates have not varied much since 2006/07 button
            the unauthorised absence rate at 1.3% is now at its highest since
            records began.
          </p>
          <p>
            This is due to an increase in absence due to family holidays that
            were not agreed by the school.
          </p>
          <p>
            The authorised absence rate at 3.4% has not changed since last year
            but have been decreasing across recent years in primary schools.
          </p>
          <p>
            The total number of days missed due to overall absence across
            state-funded primary, secondary and special schools increased from
            54.8 million in 2015/16 to 56.7 million in 2016/17.
          </p>
          <p>
            This partly reflects the rise in the total number of pupil
            enrolments - the average number of days missed per enrolment has
            increased very slightly from 8.1 days in 2015/16 to 8.2 days in
            2016/17.
          </p>
          <p>
            In 2016/17, 91.8% of pupils in primary, secondary and special
            schools missed at least 1 session during the school year which is
            similar to 91.7% figure in 2015/16.
          </p>
        </AccordionSection>

        <AccordionSection heading="Annual comparisons">
          <div className="govuk-text">
            <p>
              The latest figures in this section relate to the 2017/18 academic
              year and are based on full-year final data.
            </p>
            <h3 className="govuk-heading-s">Apprenticeship standards</h3>
            <p>
              Apprenticeship standards are high-quality employer-designed
              apprenticeships.
            </p>
            <p>
              The government is committed to all apprenticeship starts being on
              standards by the start of 2020/21. All apprenticeship frameworks
              are to be withdrawn at this point.
            </p>
            <p>Latest figures show:</p>
            <ul className="govuk-list-bullet">
              <li>
                standards accounted for 43.6% of starts – up from just 5.0% in
                2016/17
              </li>
              <li>
                since September 2014 there have been 193,100 starts and 3,000
                achievements on standards
              </li>
            </ul>
            <h3 className="govuk-heading-s">Detailed level</h3>
            <p>Latest figures show:</p>
            <ul className="govuk-list-bullet">
              <li>
                higher apprenticeship (level 4+) starts reached their highest
                volume and increased to 48,150 - up from just 3,700 in 2011/12
              </li>
              <li>
                higher apprenticeship starts have increased by 31.7% – up from
                36,570 in 2016/17
              </li>
              <li>
                higher apprenticeship starts also increased by 34.7% between
                2015/16 and 2016/17 – up to 36,570 from 27,200
              </li>
              <li>
                intermediate apprenticeship (level 2) starts decreased by 38.1%
                161,400 – down from 260,700 in 2016/17
              </li>
              <li>
                advanced apprenticeships (level 3) starts fell by 15.9% from
                2016.17 - down from 197,700 to 166,200
              </li>
              <li>
                degree and postgraduate apprenticeship (level 6 and 7) starts
                stood at 10,880 of which 58.5% (6,360) were degree
                apprenticeships – up from 1,700 in 2016/17 when they accounted
                for 96.3% (1,630) of starts
              </li>
            </ul>
          </div>
        </AccordionSection>

        <AccordionSection heading="Reasons for absence">
          <div className="govuk-inset-text">
            <p>
              Within this release absence by reason is broken down in the
              following ways:
            </p>
            <ul className="govuk-list">
              <li>
                Distribution of absence by reason - the proportion of absence
                for each reason, calculated by taking the number of absences for
                a specific reason as a percentage of the total number of
                absences
              </li>
              <li>
                Rate of absence by reason - the rate of absence for each reason,
                calculated by taking the number of absences for a specific
                reason as a percentage of the total number of possible sessions
              </li>
              <li>
                One or more sessions missed due to each reason - the number of
                pupil enrolments missing at least 1 session due to each reason
              </li>
            </ul>
          </div>
          <PrototypeDataSample
            sectionId="reasonAbsence"
            chartTitle="reason for absence in England"
            xAxisLabel="School Year"
            yAxisLabel="Absence Rate"
            chartData={[
              {
                'family holiday': 0.7,
                illness: 3.2,
                name: '2012/13',
                overall: 3.9,
              },
              {
                'family holiday': 0.7,
                illness: 3.5,
                name: '2013/14',
                overall: 4.2,
              },
              {
                'family holiday': 0.7,
                illness: 3.4,
                name: '2014/15',
                overall: 4.1,
              },
              {
                'family holiday': 0.7,
                illness: 3.3,
                name: '2015/16',
                overall: 4.0,
              },
              {
                'family holiday': 0.7,
                illness: 3.7,
                name: '2016/17',
                overall: 4.4,
              },
            ]}
            chartDataKeys={['overall', 'illness', 'family holiday']}
          />
          <p>
            Illness is the main driver for overall absence rates but while
            overall absence rates have increased slightly since 2015/16 illness
            rates have remained the same at 2.6%.
          </p>
          <p>
            Illness accounted for 55.3% of all absence in 2016/17 down from
            57.3% in 2015/16 and 60.1% in 2014/15.
          </p>
          <p>
            The rate of absence due to other unauthorised circumstances has
            remained the same as in 2015/16 at 0.7%.
          </p>
          <h3 className="govuk-heading-s">Absence due to family holiday</h3>
          <p>
            The percentage of pupils who missed at least 1 session due to a
            family holiday in 2016/17 was 16.9% compared with 14.7% in 2015/16.
          </p>
          <p>
            The absence rate due to family holidays agreed by the school statyed
            at 0.1% for 2016/17 while the percentage of all possible sessions
            missed due to unauthorised family holidays increased from 0.3% in
            2015/16 to 0.4% in 2016/17.
          </p>
          <p>
            Unauthorised holiday absence rates have been increasing gradually
            since 2006/07 while authorised holiday absence rates are much lower
            now than in 2006/07 and remained steady over recent years.
          </p>
          <p>
            A regulation amendment in September 2013 stated that term-time leave
            could only be granted in exceptional circumstances which explains
            the sharp fall in authorised holiday absence between 2012/13 and
            2013/14.
          </p>
          <p>
            The statistics and data shown here relate to the period after the
            Isle of Wight Council v Jon Platt High Court judgment (May 2016)
            where the High Court supported a local magistrates’ ruling that
            there was no case to answer and partially to the period after the
            April 2017 Supreme Court judgment where it unanimously agreed that
            no children should be taken out of school without good reason and
            clarified that 'regularly' means 'in accordance with the rules
            prescribed by the school'.
          </p>
        </AccordionSection>
        <AccordionSection heading="Distribution of absence">
          <p>
            Nearly half of all pupils (48.9%) were absent for 5 days or fewer
            across primary, secondary and special schools in 2016/17, down from
            49.1% in 2015/16.
          </p>
          <p>
            The rate of pupils who had more than 25 days of absence in 2016/17
            (4.3% ) was the same as in 2015/16.
          </p>
          <p>
            These pupils accounted for 23.5% of days missed while 8.2% of pupils
            had no absence during 2016/17.
          </p>
          <p>
            The average total absence in primary schools per pupil was 7.2 days
            compared to 16.9 days in special and 9.3 days in secondary schools.
          </p>
          <p>
            Across all schools, the overall absence rate is lowest in the autumn
            and highest in the summer term, authorised absence is in the spring
            and lowest in the summer term while unauthorised absence is highest
            in the summer term.
          </p>
        </AccordionSection>
        <AccordionSection heading="Absence by pupil characteristics">
          <p>
            The patterns of absence rates for pupils with different
            characteristics have been consistent across recent years.
          </p>
          <h3 className="govuk-heading-s">Ethnic group</h3>
          <p>
            The highest overall absence rates were for Traveller of Irish
            Heritage and Gypsy/ Roma pupils at 18.1% and 12.9% respectively.
          </p>
          <p>
            Overall absence rates for pupils of a Chinese and Black African
            ethnicity were substantially lower than the national average of 4.7%
            at 2.4% and 2.9% respectively.
          </p>
          <p>
            A similar pattern is seen in persistent absence rates where
            Traveller of Irish heritage pupils had the highest rate at 64% and
            Chinese pupils had the lowest rate at 3.1%.
          </p>
          <h3 className="govuk-heading-s">
            Free school meals (FSM) eligibility
          </h3>
          <p>
            Absence rates are higher for pupils who are known to be eligible for
            and claiming free school meals.
          </p>
          <p>
            The overall absence rate was 7.3% compared to 4.2% for non-FSM
            pupils while persistent absence was more than double the rate for
            non-FSM pupils.
          </p>
          <h3 className="govuk-heading-s">Gender</h3>
          <p>
            Overall absence rates were very similar for boys (4.7%) and girls
            (4.6%) and persistent absence rates were also similar for boys
            (10.9%) and girls (10.6%).
          </p>
          <h3 className="govuk-heading-s">National curriculum year group</h3>
          <p>
            Pupils in national curriculum year groups 3 (3.9%) and 4 (4%) had
            the lowest overall absence rates while pupils in year groups 10
            (6.1%) and 11 (6.2%) had the highest rates. This trend is repeated
            for persistent absence.
          </p>
          <h3 className="govuk-heading-s">Special educational need (SEN)</h3>
          <p>
            Pupils with a statement of special educational needs (SEN) or
            education healthcare plan (EHC) had an overall absence rate of 8.2%
            compared to 4.3% for those with no identified SEN.
          </p>
          <p>
            The persistent absence rate was more than 2 times higher for pupils
            with an SEN statement or EHC plan compared to thise with no
            identified SEN.
          </p>
        </AccordionSection>
        <AccordionSection heading="Absence for 4-year-olds">
          <p>
            The overall absence rate for 4-year-olds in 2016/17 was 5.1% which
            is down on the 5.2% rate for the previous 2 years.
          </p>
          <p>
            Absence recorded for 4-year-olds is not treated as 'authorised' or
            'unauthorised' and is therefore reported as overall absence only.
          </p>
        </AccordionSection>
        <AccordionSection heading="Pupil referral unit absence">
          <p>
            The overall absence rate for pupil referral units in 2016/17 was
            33.9% compared to 32.6% in 2015/16.
          </p>
          <p>
            Persistent absence in pupil referral units was 73.9% in 2016/17
            compared to 72.5% in 2015/16.
          </p>
        </AccordionSection>
        <AccordionSection
          heading="Regional and local authority (LA) breakdown"
          onToggle={() => mapRef && mapRef.refresh()}
        >
          <PrototypeAbsenceData
            ref={el => {
              if (el) {
                // eslint-disable-next-line prefer-destructuring
                mapRef = el.mapRef;
              }
            }}
          />

          <p>
            Overall and persistent absence rates vary across primary, secondary
            and special schools by region LA.
          </p>
          <p>
            Similar to last year, the 3 regions with the highest overall absence
            rate across all school types are the North East (4.9%), Yorkshire
            and the Humber (4.9%) and the South West (4.8%) with Inner and Outer
            London having the lowest overall absence rate (4.4%).
          </p>
          <p>
            The region with the highest persistent absence rate is Yorkshire and
            the Humber (11.9%) with Outer London having the lowest rate of
            persistent absence (10%).
          </p>
          <p>
            For LA-level absence statistics and data download our data files.
          </p>
          <p>
            You can customise and download data as Excel or .csv files. Our data
            can also be accessed via an API.
          </p>
          <ul className="govuk-list">
            <li>
              <a href="#" className="govuk-link">
                Download .csv files
              </a>
            </li>
            <li>
              <a href="#" className="govuk-link">
                Download Excel files
              </a>
            </li>
            <li>
              <a href="#" className="govuk-link">
                Download pdf files
              </a>
            </li>
            <li>
              <a href="#" className="govuk-link">
                Access API
              </a>{' '}
              -{' '}
              <a href="#" className="govuk-link">
                What is an API?
              </a>
            </li>
          </ul>
        </AccordionSection>
      </Accordion>
      <h2 className="govuk-heading-m govuk-!-margin-top-9">Help and support</h2>
      <Accordion id="extra-information-sections">
        <AccordionSection
          heading="Pupil absence statistics: methodology"
          caption="How we collect and process statistics and data"
          headingTag="h3"
        >
          <p>
            Read our{' '}
            <a href="/prototypes/methodology-absence">
              Pupil absence statistics: methodology
            </a>{' '}
            guidance.
          </p>
        </AccordionSection>
        <AccordionSection heading="About these statistics">
          <p className="govuk-body">
            The statistics and data show the absence of pupils of compulsory
            school age during the 2016/17 academic year in the following
            state-funded school types:
          </p>
          <ul className="govuk-list-bullet">
            <li>primary schools</li>
            <li>secondary schools</li>
            <li>special schools</li>
          </ul>
          <p>
            The statistics and data also includes information on absence in
            pupil referral units and for pupils aged 4.
          </p>
          <p>
            We use the key measures of 'overall' and 'persistent' absence to
            monitor pupil absence while 'absence by reason' and 'pupil
            characteristics' are also included.
          </p>
          <p>
            The statistics and data are available at national, regional, local
            authority (LA) and school level and are used by LAs and schools to
            compare their local absence rates to regional and national averages
            for different pupil groups.
          </p>
          <p>
            The statistics and data are also used for policy development as key
            indicators in behaviour and school attendance policy.
          </p>
        </AccordionSection>

        <AccordionSection heading="National Statistics" headingTag="h3">
          <p className="govuk-body">
            The United Kingdom Statistics Authority designated these statistics
            as National Statistics in 2011 in accordance with the Statistics and
            Registration Service Act 2007 and signifying compliance with the
            Code of Practice for Statistics.
          </p>
          <p className="govuk-body">
            Designation can be broadly interpreted to mean that the statistics:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>meet identified user needs</li>
            <li>are well explained and readily accessible</li>
            <li>are produced according to sound methods</li>
            <li>
              are managed impartially and objectively in the public interest
            </li>
          </ul>
          <p className="govuk-body">
            Once statistics have been designated as National Statistics it's a
            statutory requirement that the Code of Practice shall continue to be
            observed.
          </p>
          <p>
            Information on improvements made to these statistics to continue
            their compliance with the Code of Practice are provided in this{' '}
            <a href="#">accompanying document</a>
          </p>
        </AccordionSection>
        <AccordionSection heading="Contact us" headingTag="h3">
          <p>
            If you have a specific enquiry about absence and exclusion
            statistics and data:
          </p>
          <h4 className="govuk-heading-s govuk-!-margin-bottom-0">
            School absence and exclusions team
          </h4>

          <p className="govuk-!-margin-top-0">
            Email <br />
            <a href="mailto:schools.statistics@education.gov.uk">
              schools.statistics@education.gov.uk
            </a>
          </p>

          <p>
            Telephone: Mark Pearson <br /> 0114 274 2585
          </p>

          <h4 className="govuk-heading-s govuk-!-margin-bottom-0">
            Press office
          </h4>
          <p className="govuk-!-margin-top-0">If you have a media enquiry:</p>
          <p>
            Telephone <br />
            020 7925 6789
          </p>
          <h4 className="govuk-heading-s govuk-!-margin-bottom-0">
            Public enquiries
          </h4>
          <p className="govuk-!-margin-top-0">
            If you have a general enquiry about the Department for Education
            (DfE) or education:
          </p>
          <p>
            Telephone <br />
            037 0000 2288
          </p>
        </AccordionSection>
      </Accordion>
      <h2 className="govuk-heading-m govuk-!-margin-top-9">
        Create your own tables online
      </h2>
      <p>
        Use our tool to build tables using our range of national and regional
        data.
      </p>
      <Link to="/prototypes/table-tool" className="govuk-button">
        Create tables
      </Link>
      <div className="govuk-!-margin-top-9">
        <a href="#print" className="govuk-link">
          Print this page
        </a>
      </div>
    </PrototypePage>
  );
};

export default PublicationPage;