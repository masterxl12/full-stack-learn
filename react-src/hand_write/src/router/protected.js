import React from 'react';
import { Route } from './react-router-dom'

export default function (props) {
    let { component: RouteComponent, path } = props

    return <Route
        path={path}
        render={(routeProps) => {
            return <RouteComponent {...routeProps} {...props} />
        }}
    />;



}