import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import Loading from './components/Loading';
import Loadable from 'react-loadable';

const AsyncHome = Loadable({
    loader: () => import('./components/Home'),
    loading: Loading,
});

const AsyncForecast = Loadable({
    loader: () => import('./components/Forecast'),
    loading: Loading,
});

const AsyncDetails = Loadable({
    loader: () => import('./components/Details'),
    loading: Loading,
});

const AsyncNotFound = asyncComponent(() => import('./components/NotFound'));

export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={AsyncHome} props={childProps} />
        <AppliedRoute
            path="/forecast"
            exact
            component={AsyncForecast}
            props={childProps}
        />
        <AppliedRoute
            path="/details/:city"
            exact
            component={AsyncDetails}
            props={childProps}
        />
        {/* Finally, catch all unmatched routes */}
        <Route component={AsyncNotFound} />
    </Switch>
);
