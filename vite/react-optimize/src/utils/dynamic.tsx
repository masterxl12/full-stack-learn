import React, { Suspense } from "react";
import { render } from "react-dom";

const Loading = () => <div>Loading</div>;

export function dynamic(loadComponent) {
    const LazyComponent = lazy(loadComponent)
    return () => (
        <React.Suspense fallback={<Loading />}>
            <LazyComponent />
        </React.Suspense>
    )
}

function lazy(load) {
    return class extends React.Component {
        state = { Component: null }
        componentDidMount() {
            load().then(result => {
                this.setState({ Component: result.default });
            });
        }
        render() {
            let { Component } = this.state;
            return Component && <Component />;
        }
    }
}