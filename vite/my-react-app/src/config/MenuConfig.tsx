import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { NavLink } from 'react-router-dom'

const menuConfig = [
  {
    path: '/home',
    name: '主页',
    key: '/home',
    component: <>main...</>
  },
  {
    path: '/user',
    key: '/user',
    name: '个人',
    component: <>Profiler...</>,
    children: [
      path: '/favorite',
      key: '/favorite',
      name: '喜欢',
      component: <>Favorite...</>,
    ]
  },
]

const renderMenu = (data) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <SubMenu title={item.title} key={item.key}>
          {renderMenu(item.children)}
        </SubMenu>
      )
    }
    return
    <Menu.Item title={item.title} key={item.key}>
      <NavLink to={item.key}>{item.title}</NavLink>
    </Menu.Item>
  })
}

export default renderMenu(menuConfig)