import React from 'react';
import 'antd/dist/antd.css';
import {
    Layout, Menu, Icon,
} from 'antd';
import TicketSearch from './ticket/TicketSearch'
import FlightSetting from './flight/FlightSetting'
import AircraftSetting from "./aircraft/AircraftSetting";

const {
    Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {
    state = {
        collapsed: false,
        selectedKey: 1
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    onSelect = (e) => {
        this.setState({
            selectedKey: e.key
        });
    };

    render() {
        const {selectedKey} = this.state;
        //console.log('selectedKey:' + selectedKey);
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        onSelect={this.onSelect.bind(this)}
                    >
                        <Menu.Item key="1">
                            <Icon type="search"/>
                            <span>机票查询</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="setting"/><span>设置</span></span>}
                        >
                            <Menu.Item key="2">航班设置</Menu.Item>
                            <Menu.Item key="3">飞机设置</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Layout style={{margin: '16px'}}>
                        {(() => {
                                switch (selectedKey) {
                                    case "1":
                                        return <TicketSearch/>;
                                    case "2":
                                        return <FlightSetting/>;
                                    case "3":
                                        return <AircraftSetting/>;
                                    default:
                                        return <TicketSearch/>;
                                }
                            }
                        )()}
                    </Layout>
                    <Footer style={{textAlign: 'center'}}>
                        Ticket Management System ©2019 Created by React
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MyLayout;
