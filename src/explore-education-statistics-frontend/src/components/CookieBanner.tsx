import React from 'react';
import { NextContext } from 'next';
import cookie from 'cookie';
import { useCookies, cookieMap } from '@frontend/hooks/useCookies';
import ButtonText from '@common/components/ButtonText';
import useMounted from 'explore-education-statistics-common/src/hooks/useMounted';
import styles from './CookieBanner.module.scss';

interface Props {
  cookies?: any;
}

function CookieBanner({ cookies }: Props) {
  const { getCookie, setBannerSeenCookie, setGACookie } = useCookies();

  const { isMounted } = useMounted();

  const acceptCookies = () => {
    setBannerSeenCookie(true);
    if (getCookie('disableGA') === undefined) {
      setGACookie(false);
    }
  };

  function render() {
    return (
      <div className={styles.container}>
        <div className="govuk-width-container dfe-width-container--wide">
          <p>
            <span>GOV.UK uses cookies to make the site simpler.</span>{' '}
            <ButtonText
              type="button"
              className={styles.button}
              onClick={() => {
                acceptCookies();
              }}
            >
              Accept Cookies
            </ButtonText>{' '}
            or{' '}
            <a href="/cookies">
              find out more about cookies and cookie settings
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  if (isMounted) {
    return getCookie('bannerSeen') === 'true' ? null : render();
  }
  return cookies[cookieMap.bannerSeen.name] === 'true' ? null : render();
}

CookieBanner.getInitialProps = (props: NextContext) => {
  if (props && props.req && props.req.headers && props.req.headers.cookie) {
    return {
      cookies: cookie.parse(props.req.headers.cookie),
    };
  }
  return {
    cookies: {},
  };
};

export default CookieBanner;
