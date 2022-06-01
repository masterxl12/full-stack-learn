import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "./router/react-router-dom";
import Home from "./components/Home.jsx";
import User from "./components/User.jsx";
import Profile from "./components/Profile.jsx";

ReactDOM.render(
  <Router>
    <ul>
      <li>
        <Link to="/">首页</Link>
      </li>
      <li>
        <Link to="/user">用户管理</Link>
      </li>
      <li>
        <Link to="/profile">个人中心</Link>
      </li>
    </ul>

    <Switch>
      <Route path="/home" component={Home} exact />
      <Route path="/user" component={User} exact />
      <Route path="/profile" component={Profile} exact />
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
