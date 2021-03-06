import Button from '@common/components/Button';
import {
  Form,
  FormFieldRadioGroup,
  FormFieldset,
  FormGroup,
} from '@common/components/form';
import useMounted from '@common/hooks/useMounted';
import { Dictionary } from '@common/types';
import createErrorHelper from '@common/validation/createErrorHelper';
import Yup from '@common/validation/yup';
import Link from '@frontend/components/Link';
import Page from '@frontend/components/Page';
import { useCookies } from '@frontend/hooks/useCookies';
import { Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import styles from './CookiesPage.module.scss';

interface FormValues {
  googleAnalytics: string;
}

interface Props {
  cookies: Dictionary<string>;
}

function CookiesPage({ cookies }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const { getCookie, setBannerSeenCookie, setGADisabledCookie } = useCookies(
    cookies,
  );

  const { isMounted } = useMounted();

  return (
    <Page
      title="Cookies on Explore education statistics"
      pageMeta={{ title: 'Cookies' }}
      breadcrumbLabel="Cookies"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {!submitted ? null : (
            <div
              id="submit-notification"
              className={`${styles.submitNotification} govuk-!-margin-bottom-6 govuk-!-margin-top-2`}
            >
              <h2>Your cookie settings were saved</h2>
              <p>We have stored your cookie settings.</p>
              <p>
                <a
                  href="#"
                  onClick={() => window.history.back()}
                  title="Go back to the previous page"
                >
                  Go back to the page you were looking at
                </a>
              </p>
            </div>
          )}
          <p>
            Cookies are files saved on your phone, tablet or computer when you
            visit a website.
          </p>
          <p>
            We use cookies to store information about how you use the GOV.UK
            website, such as the pages you visit.
          </p>

          {isMounted ? (
            <Formik<FormValues>
              enableReinitialize
              initialValues={{
                googleAnalytics:
                  getCookie('disableGA') === 'true' ? 'off' : 'on',
              }}
              onSubmit={values => {
                setSubmitted(true);
                window.scrollTo(0, 0);

                setBannerSeenCookie(true);
                setGADisabledCookie(values.googleAnalytics !== 'on');
              }}
              validationSchema={Yup.object<FormValues>({
                googleAnalytics: Yup.string()
                  .required('Select an option for Google analytics and cookies')
                  .oneOf(['on', 'off']),
              })}
            >
              {form => {
                const { getError } = createErrorHelper(form);

                return (
                  <Form id="cookieSettingsForm">
                    <h2 className="govuk-!-margin-top-6">Cookie settings</h2>

                    <p>
                      We use 2 types of cookie. You can choose which cookies
                      you're happy for us to use.
                    </p>

                    <section className="govuk-!-margin-bottom-6">
                      <h3>Cookies that measure website use</h3>
                      <p>
                        We use Google Analytics to measure how you use the
                        website so we can improve it based on user needs. Google
                        Analytics sets cookies that store anonymised information
                        about:
                      </p>
                      <ul>
                        <li>how you got to the site</li>
                        <li>
                          the pages you visit on GOV.UK and how long you spend
                          on each page
                        </li>
                        <li>
                          what you click on while you're visiting the site
                        </li>
                      </ul>
                      <p>
                        We do not allow Google to use or share the data about
                        how you use this site.
                      </p>
                      <FormFieldset
                        error={getError('googleAnalytics')}
                        id="cookieSettingsForm-googleAnalytics"
                        legend=""
                      >
                        <FormGroup>
                          <FormFieldRadioGroup
                            legend="Google analytics and cookies"
                            legendHidden
                            inline
                            orderDirection={['desc']}
                            showError={false}
                            name="googleAnalytics"
                            id="cookieSettingsForm-googleAnalytics"
                            options={[
                              {
                                id: 'googleAnalytics-on',
                                label: 'On',
                                value: 'on',
                              },
                              {
                                id: 'googleAnalytics-off',
                                label: 'Off',
                                value: 'off',
                              },
                            ]}
                          />
                        </FormGroup>
                      </FormFieldset>
                    </section>
                    <section className="govuk-!-margin-bottom-6">
                      <h3>Strictly necessary cookies</h3>
                      <p>These essential cookies do things like:</p>
                      <ul>
                        <li>
                          remember the notifications you've seen so we do not
                          show them to you again
                        </li>
                        <li>remember your cookie settings</li>
                      </ul>
                      <p>They always need to be on.</p>
                    </section>

                    <p>
                      <Link to="/cookies/details">
                        Find out more about cookies on Explore education
                        statistics
                      </Link>
                    </p>

                    <Button type="submit">Save changes</Button>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>
              <Link to="/cookies/details">
                Find out more about cookies on Explore education statistics
              </Link>
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  return {
    props: {
      cookies: parseCookies(context),
    },
  };
};

export default CookiesPage;
