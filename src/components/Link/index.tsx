import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { ExternalLink } from '../Icons';

export interface LinkProps extends Omit<RouterLinkProps, 'to' | 'color'> {
  to?: string;
  icon?: boolean;
  color?: boolean;
}

export const Link: React.FC<LinkProps> = props => {
  const {
    to = '',
    children,
    className = '',
    icon = true,
    color = true,
    ...restProps
  } = props;
  const isSameOrigin = to.startsWith('/');
  const isHash = to.startsWith('#');

  const finalClassName = `${className} ${
    color ? 'text-c-brand hover:text-c-brand-light transition-colors' : ''
  } inline-flex items-center`;

  const finalChildren = (
    <>
      {children}
      {icon && !isSameOrigin && !isHash && (
        <ExternalLink className="mx-1 text-c-text-lighter" />
      )}
    </>
  );

  return isSameOrigin ? (
    <RouterLink {...restProps} className={finalClassName} to={to}>
      {finalChildren}
    </RouterLink>
  ) : (
    <a
      {...restProps}
      className={finalClassName}
      href={to}
      {...(!isHash && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {finalChildren}
    </a>
  );
};
