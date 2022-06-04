import React, { useContext } from "react";
import { __RouterContext as RouterContext } from "../react-router";
import { Link, matchPath } from './index'

export default function NavLink(props) {
  const context = useContext(RouterContext);
  const { pathname } = context.location;

  const {
    to: path,//Link指向的路径
    className: classNameProp = '',//基本的类名
    style: styleProp = {},//基本的行内样式
    activeClassName = 'active',//激活的类名
    activeStyle = {},//激活的行内样式
    children,//儿子
    exact//是否要精确匹配
  } = props;

  const isActive = matchPath(pathname, { path, exact });
  const className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
  const style = isActive ? { ...styleProp, ...activeStyle } : styleProp;
  const linkProps = {
    className,
    style,
    to: path,
    children
  }

  return <Link {...linkProps} />;
}

function joinClassnames(...classNames) {
  return classNames.filter(Boolean).join(' ');
}
