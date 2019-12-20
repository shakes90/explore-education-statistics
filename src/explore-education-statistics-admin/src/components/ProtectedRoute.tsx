import LoginContext from '@admin/components/Login';
import signInService from '@admin/services/sign-in/service';
import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import ProtectedRoutes from './ProtectedRoutes';

interface ProtectedRouteProps extends RouteProps {
  redirectIfNotLoggedIn?: boolean;
}

const AuthenticationCheckingComponent = ({
  component,
  redirectIfNotLoggedIn = true,
  ...props
}: ProtectedRouteProps) => {
  const { user } = useContext(LoginContext);

  if (!component) {
    return null;
  }

  if (redirectIfNotLoggedIn && (!user || user.validToken === false)) {
    return <Redirect to={signInService.getSignInLink()} />;
  }

  return React.createElement(component, props);
};

/**
 * Creates a <Route> that firstly checks the user's authentication
 * status and then renders the protected component if the user has been
 * successfully authenticated, or redirects the user to the sign-in page
 * if in need of authentication.
 *
 * @param component
 * @param rest
 * @constructor
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const ProtectedRoute = ({
  component,
  redirectIfNotLoggedIn = true,
  ...rest
}: ProtectedRouteProps) => {
  const routeComponent = (props: any) => (
    <ProtectedRoutes>
      <AuthenticationCheckingComponent
        component={component}
        redirectIfNotLoggedIn={redirectIfNotLoggedIn}
        {...props}
      />
    </ProtectedRoutes>
  );

  return <Route {...rest} component={routeComponent} />;
};

export default ProtectedRoute;
