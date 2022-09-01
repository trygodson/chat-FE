import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteGuard from './routeguard';
import { routes } from './routes';

function App() {
  return (
    <Switch>
      {routes.map((route, i) =>
        route.guarded ? <RouteGuard key={i} {...route} /> : <Route key={i} {...route} />,
      )}
      <Redirect
        to={{
          pathname: '/',
          state: {
            from: '/',
          },
        }}
      />
    </Switch>
  );
}

export default App;
