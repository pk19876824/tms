import React from 'react';
import 'antd/dist/antd.css';
import {
    Drawer, Button, Select, Input, Row, Col, Switch, Icon, InputNumber, message
} from 'antd';
import reqwest from 'reqwest';
import emitter from '../../events';

const Option = Select.Option;

class AircraftAddDrawer extends React.Component {

    static URL = "http://127.0.0.1:9999/aircraft";

    constructor(props) {
        super(props);
        this.state = {
            idWarningVisible: false,
            idWarningText: "航班号不能为空!",
            drawerVisible: false,
            aircraftId: "",
            model: "",
            type: "中型机",
            meal: "无",
            hasEconomy: true,
            hasBusiness: true,
            economySeatNum: 150,
            economySeatSpacing: 80,
            economySeatWidth: 45,
            economySeatRake: 100,
            economyWifi: false,
            economyTV: false,
            businessSeatNum: 50,
            businessSeatSpacing: 110,
            businessSeatWidth: 55,
            businessSeatRake: 120,
            businessWifi: true,
            businessTV: true,
        }
    };

    showDrawer = () => {
        this.setState({
            drawerVisible: true
        });
    };

    closeDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    };

    changeHasEconomy = (checked) => {
        this.setState({
            hasEconomy: checked,
        })
    };

    getAircraftId = (e) => {
        this.setState({
            aircraftId: e.target.value,
            idWarningVisible: false
        })
    };

    getModel = (e) => {
        this.setState({
            model: e.target.value
        })
    };

    getType = (value) => {
        this.setState({
            type: value
        })
    };

    getMeal = (e) => {
        this.setState({
            meal: e.target.value
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

    onSubmit() {
        const data = this.state;
        reqwest({
            url: AircraftAddDrawer.URL,
            method: 'post',
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
                    this.setState({
                        idWarningVisible: false,
                        drawerVisible: false,
                    });
                    //更新table内容
                    emitter.emit('updateAircraftTable');
                } else if (data.status.code === 1000) {
                    message.error(data.status.msg);
                } else {
                    this.setState({
                        idWarningVisible: true,
                        idWarningText: data.status.msg
                    })
                }
            },
            error: (e) => {
                console.log(e);
                message.error("Server Error");
            }
        })
    };

    render() {
        const data = this.state;
        return (
            <div>
                <div>
                    <Button
                        icon="plus"
                        style={{margin: 10}}
                        type="primary"
                        ghost
                        onClick={this.showDrawer}
                    >添加航班
                    </Button>
                </div>
                <Drawer
                    title="添加航班"
                    width={400}
                    onClose={this.closeDrawer}
                    visible={data.drawerVisible}
                >
                    <div style={{marginLeft: 20, marginRight: 20}}>
                        <div style={{margin: "0 0 16px 0"}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>航班号</span>
                                </Col>
                                <Col span={16}>
                                    <Input
                                        defaultValue={data.airplaneId}
                                        allowClear={true}
                                        onChange={this.getAircraftId}
                                    />
                                </Col>
                            </Row>
                            {
                                data.idWarningVisible ?
                                    <Row>
                                        <Col offset={9}>
                                            <span style={{color: "red"}}>{data.idWarningText}</span>
                                        </Col>
                                    </Row>
                                    : <div/>
                            }
                        </div>
                        <div style={{marginBottom: 16}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>机型</span>
                                </Col>
                                <Col span={16}>
                                    <Input
                                        defaultValue={data.model}
                                        onChange={this.getModel}
                                        allowClear={true}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div style={{marginBottom: 16}}>
                            <Row type="flex" align="middle">
                                <Col span={8}>
                                    <span>类型</span>
                                </Col>
                                <Col span={16}>
                                    <Select defaultValue={data.type} onChange={this.getType}>
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
                                        <Input defaultValue={data.meal} onChange={this.getMeal}/>
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
                                        defaultChecked={data.hasEconomy}
                                        onChange={this.changeHasEconomy}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        {
                            data.hasEconomy ?
                                <div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位数</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={data.economySeatNum}
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
                                                    defaultValue={data.economySeatSpacing}
                                                    onChange={this.getEconomySeatSpacing}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
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
                                                    defaultValue={data.economySeatWidth}
                                                    onChange={this.getEconomySeatWidth}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
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
                                                    defaultValue={data.economySeatRake}
                                                    onChange={this.getEconomySeatRake}
                                                    formatter={value => `${value}˚`}
                                                    parser={value => value.replace('˚', '')}
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
                                                    defaultChecked={data.economyWifi}
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
                                                    defaultChecked={data.economyTV}
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
                                        defaultChecked={data.hasBusiness}
                                        onChange={this.changeHasBusiness}
                                    />
                                </Col>
                            </Col>
                        </Row>
                        {
                            data.hasBusiness ?
                                <div>
                                    <div style={{paddingTop: 16}}>
                                        <Row type="flex" align="middle">
                                            <Col span={8}>
                                                <span>座位数</span>
                                            </Col>
                                            <Col>
                                                <InputNumber
                                                    defaultValue={data.businessSeatNum}
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
                                                    defaultValue={data.businessSeatSpacing}
                                                    onChange={this.getBusinessSeatSpacing}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
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
                                                    defaultValue={data.businessSeatWidth}
                                                    onChange={this.getBusinessSeatWidth}
                                                    formatter={value => `${value}cm`}
                                                    parser={value => value.replace('cm', '')}
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
                                                    defaultValue={data.businessSeatRake}
                                                    onChange={this.getBusinessSeatRake}
                                                    formatter={value => `${value}˚`}
                                                    parser={value => value.replace('˚', '')}
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
                                                    defaultChecked={data.businessWifi}
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
                                                    defaultChecked={data.businessTV}
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
                                <Button type="primary" onClick={this.onSubmit.bind(this)}>确定</Button>
                            </Col>
                        </Row>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default AircraftAddDrawer;