import { RouteModel } from '../../models';
import { Dashboard } from '../../views';

export const routerService: Array<RouteModel> = [
  {
    path: 'dashboard',
    component: Dashboard,
    permissions: ['Admin'],
  },
  {
    path: 'properties',
    component: Dashboard,
    permissions: ['Admin'],
  },
];
