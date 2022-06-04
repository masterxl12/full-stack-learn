import React, { useContext } from 'react';
import RouterContext from './RouterContext';

export function useHistory() {
    const context = useContext(RouterContext)
    return context.history
}

export function useLocation() {
    const context = useContext(RouterContext)
    return context.location
}

export function useParams() {
    const context = useContext(RouterContext)
    return context.match ? context.match.params : {}
}
