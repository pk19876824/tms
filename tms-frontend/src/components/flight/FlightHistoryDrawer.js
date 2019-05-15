import React from 'react';
import 'antd/dist/antd.css';
import {
    Drawer, Select, Input, Row, Col, Switch, Icon, Typography
} from 'antd';

const {Title, Paragraph, Text} = Typography;

class FlightHistoryDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerVisible: false
        }
    }

    closeDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    };

    openDrawer = () => {
        this.setState({
            drawerVisible: true
        })
    };

    isEmpty = (list) => {
        if (!list && list !== 0 && list !== '') {
            return true;
        }
        if (Array.prototype.isPrototypeOf(list) && list.length === 0) {
            return true;
        }
        return Object.prototype.isPrototypeOf(list) && Object.keys(list).length === 0;
    };

    getLocalTime = (nS) => {
        return new Date(nS).toLocaleString().replace(/:\d{1,2}$/, ' ');
    };

    render() {
        const state = this.state;
        const data = this.props.data;
        const history = data.airlines.history;
        const inFlight = data.airlines.inFlight;
        const notStart = data.airlines.notStart;

        return (
            <div>
                <a onClick={this.openDrawer}>点击查看所有航程</a>
                <Drawer
                    title={data.detail.aircraftId}
                    width={400}
                    onClose={this.closeDrawer}
                    visible={state.drawerVisible}
                >
                    {
                        this.isEmpty(history) ?
                            <div/>
                            : <div>
                                <div>
                                    <Title level={4}>历史航程</Title>
                                </div>
                                {
                                    history.map(value => {
                                        return (
                                            <div style={{padding: '10px', borderTop: 'dashed 1px'}}>
                                                <Row type="flex" align="middle">
                                                    <Text code>
                                                        {this.getLocalTime(value.startTime)} ~ {this.getLocalTime(value.endTime)}
                                                    </Text>
                                                </Row>
                                                <div>
                                                    <Row type="flex" align="middle">
                                                        <Col span={6} offset={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="secondary" style={{fontSize: 24}}>
                                                                    {value.startLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="secondary" style={{fontSize: 24}}>
                                                                    ～
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="secondary" style={{fontSize: 24}}>
                                                                    {value.endLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                    {
                        this.isEmpty(inFlight) ?
                            <div/>
                            : <div>
                                <div>
                                    <Title level={4}>正在进行</Title>
                                </div>
                                {
                                    inFlight.map(value => {
                                        return (
                                            <div style={{padding: '10px', borderTop: 'dashed 1px'}}>
                                                <Row type="flex" align="middle">
                                                    <Text code>
                                                        {this.getLocalTime(value.startTime)} ~ {this.getLocalTime(value.endTime)}
                                                    </Text>
                                                </Row>
                                                <div>
                                                    <Row type="flex" align="middle">
                                                        <Col span={6} offset={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="danger" style={{fontSize: 24}}>
                                                                    {value.startLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="danger" style={{fontSize: 24}}>
                                                                    ～
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="danger" style={{fontSize: 24}}>
                                                                    {value.endLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                    {
                        this.isEmpty(notStart) ?
                            <div/>
                            : <div>
                                <div>
                                    <Title level={4}>未来计划</Title>
                                </div>
                                {
                                    notStart.map(value => {
                                        return (
                                            <div style={{padding: '10px', borderTop: 'dashed 1px'}}>
                                                <Row type="flex" align="middle">
                                                    <Text code>
                                                        {this.getLocalTime(value.startTime)} ~ {this.getLocalTime(value.endTime)}
                                                    </Text>
                                                </Row>
                                                <div>
                                                    <Row type="flex" align="middle">
                                                        <Col span={6} offset={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="warning" style={{fontSize: 24}}>
                                                                    {value.startLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={4}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="warning" style={{fontSize: 24}}>
                                                                    ～
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={6}>
                                                            <div style={{textAlign: "center"}}>
                                                                <Text type="warning" style={{fontSize: 24}}>
                                                                    {value.endLocation}
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </Drawer>
            </div>
        )
    }
}

export default FlightHistoryDrawer;