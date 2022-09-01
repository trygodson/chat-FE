import { RouteModel } from '../models';
import DefaultLayout from '../shared/defaultlayout';
import { Login, SignUp } from '../views';
import Chat from '../views/chat';

const routes: Array<RouteModel> = [
  {
    path: '/',
    exact: true,
    component: SignUp,
    guarded: false,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    guarded: false,
  },
  {
    path: '/chat',

    component: Chat,
    guarded: true,
  },
  {
    path: '/app',

    component: DefaultLayout,
    guarded: true,
  },
];

export { routes };
