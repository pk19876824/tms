import React from 'react';
import 'antd/dist/antd.css';
import {
    Drawer, Button, Select, Input, Row, Col, Switch, Icon, InputNumber, message
} from 'antd';
import emitter from "../../events";
import reqwest from 'reqwest';

const Option = Select.Option;

class AircraftEditDrawer extends React.Component {

    static URL = 'http://127.0.0.1:9999/aircraft';

    constructor(props) {
        super(props);
        const data = props.data;
        console.log('AircraftEditDrawer data:' + data);
        //console.log('AircraftEditDrawer drawerVisible:' + props.drawerVisible);
        this.state = {
            aircraftId: data.aircraftId,
            model: data.model,
            type: data.type,
            meal: data.meal,
            hasEconomy: data.hasEconomy,
            hasBusiness: data.hasBusiness,
            economySeatNum: data.hasEconomy ? data.economyConfig.seatNum : 0,
            economySeatSpacing: data.hasEconomy ? data.economyConfig.seatSpacing : 0,
            economySeatWidth: data.hasEconomy ? data.economyConfig.seatWidth : 0,
            economySeatRake: data.hasEconomy ? data.economyConfig.rake : 0,
            economyWifi: data.hasEconomy ? data.economyConfig.wifi : false,
            economyTV: data.hasEconomy ? data.economyConfig.tv : false,
            businessSeatNum: data.hasBusiness ? data.businessConfig.seatNum : 0,
            businessSeatSpacing: data.hasBusiness ? data.businessConfig.seatSpacing : 0,
            businessSeatWidth: data.hasBusiness ? data.businessConfig.seatWidth : 0,
            businessSeatRake: data.hasBusiness ? data.businessConfig.rake : 0,
            businessWifi: data.hasBusiness ? data.businessConfig.wifi : false,
            businessTV: data.hasBusiness ? data.businessConfig.tv : false,
        }
    };

    closeDrawer = () => {
        this.props.closeDrawer();
    };

    changeHasEconomy = (checked) => {
        this.setState({
            hasEconomy: checked,
        })
    };

    getModel = (value) => {
        this.setState({
            model: value
        })
    };

    getType = (value) => {
        this.setState({
            type: value
        })
    };

    getMeal = (value) => {
        this.setState({
            meal: value
        })
    };

    getEconomySeatNum = (value) => {
        this.setState({
            economySeatNum: value
        })
    };

    getEconomySeatSpacing = (value) => {
        this.setState({
            economySeatSpacing: value
        })
    };

    getEconomySeatWidth = (value) => {
        this.setState({
            economySeatWidth: value
        })
    };

    getEconomySeatRake = (value) => {
        this.setState({
            economySeatRake: value
        })
    };

    getEconomyWifi = (value) => {
        this.setState({
            economyWifi: value
        })
    };

    getEconomyTV = (value) => {
        this.setState({
            economyTV: value
        })
    };

    changeHasBusiness = (checked) => {
        this.setState({
            hasBusiness: checked,
        })
    };

    getBusinessSeatNum = (value) => {
        this.setState({
            businessSeatNum: value
        })
    };

    getBusinessSeatSpacing = (value) => {
        this.setState({
            businessSeatSpacing: value
        })
    };

    getBusinessSeatWidth = (value) => {
        this.setState({
            businessSeatWidth: value
        })
    };

    getBusinessSeatRake = (value) => {
        this.setState({
            businessSeatRake: value
        })
    };

    getBusinessWifi = (value) => {
        this.setState({
            businessWifi: value
        })
    };

    getBusinessTV = (value) => {
        this.setState({
            businessTV: value
        })
    };

    onSubmit = () => {
        const data = this.state;
        reqwest({
            url: AircraftEditDrawer.URL,
            method: 'put',
            data: JSON.stringify({
                aircraftId: data.aircraftId,
                model: data.model,
                type: data.type,
                meal: data.meal,
                hasEconomy: data.hasEconomy,
                economyConfig: {
                    seatNum: data.economySeatNum,
                    seatSpacing: data.economySeatSpacing,
                    seatWidth: data.economySeatWidth,
                    rake: data.economySeatRake,
                    wifi: data.economyWifi,
                    tv: data.economyTV
                },
                hasBusiness: data.hasBusiness,
                businessConfig: {
                    seatNum: data.businessSeatNum,
                    seatSpacing: data.businessSeatSpacing,
                    seatWidth: data.businessSeatWidth,
                    rake: data.businessSeatRake,
                    wifi: data.businessWifi,
                    tv: data.businessTV
                }
            }),
            type: 'json',
            contentType: 'application/json;charset=utf-8',
            success: (data) => {
                if (data.status.code === 0) {
                    this.closeDrawer();
                    //更新table内容
                    emitter.emit('updateAircraftTable');
                } else if (data.status.code === 1000) {
                    message.error(data.status.msg);
                }
            },
            error: (e) => {
                console.log(e);
                message.error("Server Error");
            }
        })
    };

    render() {
        const state = this.state;
        const drawerVisible = this.props.drawerVisible;
        return (
            <div>
                <Drawer
                    title="编辑航班"
                    width={400}
                    onClose={this.closeDrawer}
                    visible={drawerVisible}
                >
                    <div style={{marginLeft: 20, marginRight: 20}}>
                        <div style={{margin: "0 0 16px 0"}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>航班号</span>
                                </Col>
                                <Col span={16}>
                                    <Input disabled={true} defaultValue={state.aircraftId}/>
                                </Col>
                            </Row>
                        </div>
                        <div style={{marginBottom: 16}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>机型</span>
                                </Col>
                                <Col span={16}>
                                    <Input defaultValue={state.model} onChange={this.getModel}/>
                                </Col>
                            </Row>
                        </div>
                        <div style={{marginBottom: 16}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>类型</span>
                                </Col>
                                <Col span={16}>
                                    <Select defaultValue={state.type} onChange={this.getType}>
                                        <Option value={"小型机"}>小型机</Option>
                                        <Option value={"中型机"}>中型机</Option>
                                        <Option value={"大型机"}>大型机</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                        <div style={{marginBottom: 16}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>餐食</span>
                                </Col>
                                <Col span={16}>
                                    <Col span={16}>
                                        <Input defaultValue={state.meal} onChange={this.getMeal}/>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div style={{borderTop: "dashed 1px", padding: "16px 0", marginLeft: 20, marginRight: 20}}>
                        <Row type="flex" align="middle">
                            <Col span={8}>
                                <span>经济舱</span>
                            </Col>
                            <Col span={16}>
                                <Col span={16}>
                                    <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        defaultChecked={state.hasEconomy}
                                        onChange={this.changeHasEconomy}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        {
                            state.hasEconomy ?
                                <div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位数</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.economySeatNum}
                                                    onChange={this.getEconomySeatNum}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位间距</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.economySeatSpacing}
                                                    onChange={this.getEconomySeatSpacing}
                                                    formatter={value => `${value}cm`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位宽度</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.economySeatWidth}
                                                    onChange={this.getEconomySeatWidth}
                                                    formatter={value => `${value}cm`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>可倾斜度</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.economySeatRake}
                                                    onChange={this.getEconomySeatRake}
                                                    formatter={value => `${value}˚`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>无线网络</span>
                                            </Col>
                                            <Col>
                                                <Switch
                                                    checkedChildren={"有"}
                                                    unCheckedChildren={"无"}
                                                    defaultChecked={state.economyWifi}
                                                    onChange={this.getEconomyWifi}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>电视</span>
                                            </Col>
                                            <Col>
                                                <Switch
                                                    checkedChildren={"有"}
                                                    unCheckedChildren={"无"}
                                                    defaultChecked={state.economyTV}
                                                    onChange={this.getEconomyTV}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                : <div/>
                        }
                    </div>
                    <div style={{borderTop: "dashed 1px", padding: "16px 0", marginLeft: 20, marginRight: 20}}>
                        <Row type="flex" align="middle">
                            <Col span={8}>
                                <span>商务舱</span>
                            </Col>
                            <Col span={16}>
                                <Col span={16}>
                                    <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        defaultChecked={state.hasBusiness}
                                        onChange={this.changeHasBusiness}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        {
                            state.hasBusiness ?
                                <div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位数</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.businessSeatNum}
                                                    onChange={this.getBusinessSeatNum}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位间距</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.businessSeatSpacing}
                                                    onChange={this.getBusinessSeatSpacing}
                                                    formatter={value => `${value}cm`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位宽度</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.businessSeatWidth}
                                                    onChange={this.getBusinessSeatWidth}
                                                    formatter={value => `${value}cm`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>可倾斜度</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={state.businessSeatRake}
                                                    onChange={this.getBusinessSeatRake}
                                                    formatter={value => `${value}˚`}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>无线网络</span>
                                            </Col>
                                            <Col>
                                                <Switch
                                                    checkedChildren={"有"}
                                                    unCheckedChildren={"无"}
                                                    defaultChecked={state.businessWifi}
                                                    onChange={this.getBusinessWifi}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>电视</span>
                                            </Col>
                                            <Col>
                                                <Switch
                                                    checkedChildren={"有"}
                                                    unCheckedChildren={"无"}
                                                    defaultChecked={state.businessTV}
                                                    onChange={this.getBusinessTV}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                : <div/>
                        }
                    </div>
                    <div style={{borderTop: "dashed 1px", padding: "16px 0 0 0", marginLeft: 20, marginRight: 20}}>
                        <Row gutter={8}>
                            <Col span={6} offset={12}>
                                <Button onClick={this.closeDrawer}>取消</Button>
                            </Col>
                            <Col span={6}>
                                <Button type="primary" onClick={this.onSubmit}>确定</Button>
                            </Col>
                        </Row>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default AircraftEditDrawer;