import React, { useState, useEffect } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import SideBar from './sidebar';
import { routerService } from '../router_service';
import { PermissionedRoute } from '../router_service/permissionedroute';

interface DefaultLayoutProps extends RouteComponentProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <motion.section className="w-screen flex justify-between" style={{ backgroundColor: 'FBFBFB' }}>
      <SideBar isOpen={isOpen} toggle={toggle} {...props} />
      <div
        className={`h-screen relative `}
        style={{ width: `calc(100% - ${isOpen ? '225px' : '60px'})`, overflowY: 'scroll' }}
      >
        <motion.div>
          <Switch>
            {routerService &&
              routerService.map((route, key) => (
                <PermissionedRoute
                  key={key}
                  path={`${props.match.url}/${route.path}`}
                  component={route.component}
                  permissions={route.permissions}
                />
              ))}
            <Redirect from={'/'} to={'/dashboard'}></Redirect>
          </Switch>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DefaultLayout;
