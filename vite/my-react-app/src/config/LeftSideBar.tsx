import React from 'react';
import { Menu } from 'antd';
import MenuChildren from './MenuConfig'

export const LeftSideBar = () => {
    return (
        <Menu>{MenuChildren}</Menu>
    )
}