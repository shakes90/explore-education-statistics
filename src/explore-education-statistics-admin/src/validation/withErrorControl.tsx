import { ErrorControlContext } from '@admin/components/ErrorBoundary';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Omit } from 'react-router';

export interface ErrorControlProps {
  apiErrorFallbackHandler: (error: AxiosResponse) => void;
}

/**
 * This function creates a higher order component of the provided Component, that supplies it with the
 * "apiErrorFallbackHandler" function for ease of signalling errors back to the ErrorBoundary surrounding the
 * component tree and resulting in an error page.
 *
 * The <P> type represents the props that the passed-in Component has on it.
 * The <O> type represents the component's props minus any from ErrorControlProps.
 *
 * Therefore this HOC function expects to be passed Components that expect props from ErrorControlProps and optionally
 * others as well, but returns a function that expects the caller to provide all other props OTHER THAN the ones from
 * ErrorControlProps - the reason being that it is the job of this HOC function to provide the props in
 * ErrorControlProps, not the code that includes the wrapped Component as a child.
 *
 * @param Component
 */
function withErrorControl<
  P extends ErrorControlProps & any,
  O extends Omit<P, keyof ErrorControlProps>
>(Component: React.ComponentType<P>): (props: O) => JSX.Element {
  // eslint-disable-next-line react/display-name
  return (props: O) => (
    <ErrorControlContext.Consumer>
      {({ setErrorCode }) => {
        return (
          <Component
            {...props}
            apiErrorFallbackHandler={(error: AxiosResponse) =>
              setErrorCode(error.status)
            }
          />
        );
      }}
    </ErrorControlContext.Consumer>
  );
}

export default withErrorControl;
