import React from 'react';
import { Switch, Route } from 'react-router';
import DashboardLayout from './components/DashboardLayout';

import Home from './container/Home';
import Campaign from './container/Campaign';
import CampaignForm from './container/CampaignForm';
import NotFound from './container/NotFound';

const routes = [
  {
    key: 'home',
    component: (props) => (<Home {...props }/>),
    path: '/',
    exact: true,
  },
  {
    key: 'campaign-list',
    component: (props) => (<Campaign {...props }/>),
    path: '/campaign',
    exact: true,
  },
  {
    key: 'campaign-details',
    component: (props) => (<CampaignForm {...props }/>),
    path: '/campaign/:id',
    exact: true,
  },
  {
    key: 'not-found',
    path: '*',
    component: (props) => (<NotFound {...props} />),
    exact: true,
  }
]

const menu = [
  {
    key: 'home',
    icon: 'home',
    label: 'Home',
    route: '/'
  },
  {
    key: 'campaign-list',
    icon: 'list_alt',
    label: 'Campaigns',
    route: '/campaign'
  }
]

export function renderRoutes(extraProps = {}, switchProps = {}) {
  return (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const { pageProps = { }, key } = route;
            return (
              <DashboardLayout
                key={key}
                pageId={key}
                menuItems={menu}
                {...props}
              >
                <route.component {...props} route={route} />
              </DashboardLayout>
            );
          }}
        />
      ))}
    </Switch>
  )
}
