import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from 'react-router-dom'
import Home from "./Home";
import Personal from "./Personal";
import { Switch, Route, HashRouter as Router, NavLink } from 'react-router-dom';
import Profile from "./Profile";

export const menuConfig = [
  {
    path: '/home',
    label: '主页',
    key: 'home',
    component: Home
  },
  {
    path: '/user',
    key: 'user',
    label: '个人',
    component: Profile,
    children: [
      {
        path: '/favorite',
        key: 'favorite',
        label: '喜欢',
        component: Personal
      }
    ]
  },
]

export const renderMenu = (data) => {
  return data?.map((item) => {
    if (item.children?.length) {
      return (
        <SubMenu title={item.label} key={item.key}>
          {renderMenu(item.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item title={item.label} key={item.key}>
        <Router>
          <NavLink to={item.key}>{item.label}</NavLink>
        </Router>
      </Menu.Item>
    )
  })
}

const menus = renderMenu(menuConfig)
console.log(menus, "***");

export default menus