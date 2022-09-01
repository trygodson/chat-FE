import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface PermissionedRouteProps {
  key: string | number;
  path: string;
  component: React.FC<RouteComponentProps>;
  permissions?: [string] | [];
}

const PermissionedRoute: React.FC<PermissionedRouteProps> = ({
  key,
  path,
  component,
  permissions,
  ...props
}) => {
  const user = {
    permissions: ['Admin'],
  };
  return !permissions ||
    permissions.length === 0 ||
    permissions.some((r) => user.permissions?.indexOf(r) >= 0) ? (
    <Route key={key} path={path} component={component} />
  ) : (
    <Redirect to={'/'} />
  );
};

export { PermissionedRoute };
