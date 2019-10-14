import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import styles from './NavLink.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  unvisited?: boolean;
} & NavLinkProps;

const NavLink = ({
  children,
  className,
  to,
  // unvisited = false,
  ...props
}: Props) => {
  return (
    <RouterNavLink
      {...props}
      to={to}
      activeClassName={styles['app-navigation--current-page']}
      className={classNames(
        'govuk-link',
        'govuk-link--no-visited-state',
        className,
      )}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
