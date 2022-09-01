import { SideMenuModel } from '../../models';

export const MenuList: Array<SideMenuModel> = [
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    to: '/app/dashboard',
    icon: 'fi fi-rr-apps',
    permissions: ['Admin'],
  },
  {
    id: 'settings',
    label: 'SETTINGS',
    to: '/app/properties',
    icon: 'fi fi-rr-settings-sliders',
    permissions: ['Admin'],
  },
  {
    id: 'nootification',
    label: 'Notification',
    to: '/app/dashboard',
    icon: 'fi fi-rr-bell-ring',
    permissions: ['Admin'],
  },
];
