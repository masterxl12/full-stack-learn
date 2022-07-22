import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { ViewList } from './components/VirtualList';
import { dynamic } from './utils';

import cacheReducer from './common/keepAlive/cacheReducer';
import { KeepAliveProvider, withKeepAlive } from './common/keepAlive';
import Home from './components/Home';
import User from './components/User';
import UserList from './components/UserList';

/*
const LoadingUser = dynamic(() => import('./components/User'));
const LoadingUserList = dynamic(() => import('./components/UserList'));
const LoadingHome = dynamic(() => import('./components/Home'));
*/

const KeepAliveHome = withKeepAlive(Home, { cacheId: 'home' });
const KeepAliveUser = withKeepAlive(User, { cacheId: 'User' });
const KeepAliveUserList = withKeepAlive(UserList, { cacheId: 'UserList', scroll: true });

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

ReactDOM.render(
  <>
    <BrowserRouter>
      <KeepAliveProvider>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li> <Link to="/user">User</Link></li>
          <li> <Link to="/userlist">UserList</Link></li>
        </ul>
        <Switch>
          <Route path="/" exact={true} component={KeepAliveHome} />
          <Route path="/user" component={KeepAliveUser} />
          <Route path="/userlist" component={KeepAliveUserList} />
        </Switch>
      </KeepAliveProvider>
    </BrowserRouter>

    {/* <ViewList width='50%'
      containerHeight={500}
      itemCount={30}
      itemSize={50} /> */}
    {/* {Row({ index: 12, style: { background: "red" } })} */}
  </>
  , document.getElementById('root'));
