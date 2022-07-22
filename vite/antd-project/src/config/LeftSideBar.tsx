import React from 'react';
import { Menu, Layout, Pagination, Radio, Table, Badge } from 'antd';
import MenuChildren, { menuConfig, renderMenu } from './MenuConfig'
import { Switch, Route, HashRouter as Router, NavLink } from 'react-router-dom';
import { ColumnType } from 'antd/es/table';
const { Header, Content, Footer, Sider } = Layout;


interface SearchTablePShape {
    children?: React.ReactNode
    columns: ColumnType[]
    dataSource: any[]
    fetchData: (params?: Record<string, any>) => Promise<any>
    onTabChange?: (event: string | number) => void
    onSearch: (formValues: Record<string, any>) => void
    onReset: () => void
    onPageChange?: (page: number, pageSize: number) => void
    onShowSizeChange?: (current: number, size: number) => void
}



interface SearchTableProps {
    children: React.ReactNode
    columns: ColumnType[]
    dataSource: any[]
    activeTab: string | number
    rowKey: string
    radioOptions?: { label: string, value: string, count?: string | number, dot?: boolean }[]
    onTabChange: (currentTab: string | number) => void
    fetchData: (params: Record<string, any>) => Promise<any>
    onSearch?: (formValues: Record<string, any>) => void
    onReset?: () => void
    onPageChange?: (page: number, pageSize: number) => void
    onShowSizeChange?: (current: number, size: number) => void
}

const SearchTable: React.FC<SearchTableProps> = ({
    children,
    columns,
    radioOptions,
    activeTab,
    rowKey = "id",
    onPageChange,
    onShowSizeChange
}) => {

    return (
        <>
            <SearchForm>{children}</SearchForm>
            {
                radioOptions?.length && <Radio.Group onChange={onTabChange} defaultValue={activeTab}>
                    {
                        radioOptions.map((item) => (<Radio.Button
                            key={item.label}>
                            {item.label}({item.count}){item.dot && <Badge>{item.dot}</Badge>}
                        </Radio.Button>))
                    }
                </Radio.Group>
            }
            <Table
                rowKey={rowKey}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    //...
                    onChange: onPageChange,
                    onShowSizeChange
                }}
            ></Table>
        </>
    )
}


export const LeftSideBar = () => {

    const clickHandler = (e) => {
        console.log(e);
    }

    return (
        <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    theme="dark"
                    onSelect={clickHandler}
                >
                    {
                        renderMenu(menuConfig)
                    }
                    {/* {
                        menuConfig.map((item, index) => {
                            return (
                                <Menu.Item key={item.path}>
                                    <Router>
                                        <NavLink to={item.path || '#'} >
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </Router>
                                </Menu.Item>
                            )
                        })
                    } */}
                </Menu>
            </Sider>
            <Content style={{ padding: '12px 24px', minHeight: 280 }}>
                <Router>
                    <Switch>
                        {
                            menuConfig.map((item, index) => {
                                if (item.children?.length) {
                                    return (
                                        <Route
                                            path={item.path}
                                            key={index}
                                            render={() => (
                                                <item.component>
                                                    {
                                                        item.children.map((children, childrenKey) => {
                                                            return (
                                                                <Route path={children.path} key={children.path} component={children.component}></Route>
                                                            )
                                                        })
                                                    }
                                                </item.component>
                                            )}>
                                        </Route>
                                    )
                                } else {
                                    return <Route path={item.path} key={index} component={item.component}></Route>
                                }
                            })
                        }
                    </Switch>
                </Router>
            </Content>
        </Layout>
    )
}