import React from 'react';
import { RouteComponentProps } from 'react-router';
import { JsxElement } from 'typescript';

export interface RouteModel {
  path: string;
  exact?: boolean;
  component: React.FC<RouteComponentProps>;
  guarded?: boolean;
  permissions?: [string] | [];
}

export interface SideMenuModel {
  id: string;
  label: string;
  to: string;
  icon: string;
  permissions?: [string] | [];
}
