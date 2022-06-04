import React from 'react';
import RouterContext from './RouterContext';

export default function withRouter(OldComponent) {
    return props => {
        return <RouterContext.Consumer>
            {
                contextValue => <OldComponent {...props} {...contextValue} />
            }
        </RouterContext.Consumer>
    }
}
