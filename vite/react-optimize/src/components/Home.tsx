import React from "react";

export default function Home(props) {
    console.log(props);
    return <>
        <button onClick={() => props.dispatch({ type: 'DESTROY', payload: { cacheId: 'UserAdd' } })}>重置UserAdd</button>
        <button onClick={() => props.dispatch({ type: 'DESTROY', payload: { cacheId: 'UserList' } })}>重置UserList</button>
    </>
}