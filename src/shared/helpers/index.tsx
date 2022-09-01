import { SideMenuModel } from '../../models';

export const filteredList = (menuItems: Array<SideMenuModel>) => {
  const permission = ['Admin'];

  if (permission) {
    return menuItems.filter(
      (x) =>
        (x.permissions && permission.some((r) => x.permissions!.indexOf(r as never) >= 0)) ||
        !x.permissions ||
        x.permissions.length === 0,
    );
  } else {
    return menuItems;
  }
};

export const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.5,
    },
  },
};
