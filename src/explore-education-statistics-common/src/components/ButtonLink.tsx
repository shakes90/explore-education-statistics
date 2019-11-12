import React, { ReactNode } from 'react';

interface ButtonLinkProps {
  children: ReactNode;
  to?: string;
  as: string;
  href: string;
}

let RealButtonLink: React.ComponentType<ButtonLinkProps>;
export type ButtonLinkType = typeof RealButtonLink;

export function SetRealButtonLink(buttonLink: ButtonLinkType) {
  RealButtonLink = buttonLink;
  return RealButtonLink;
}

const ButtonLink = (props: ButtonLinkProps) => {
  const { children } = props;
  return <RealButtonLink {...props}>{children}</RealButtonLink>;
};

export default ButtonLink;
