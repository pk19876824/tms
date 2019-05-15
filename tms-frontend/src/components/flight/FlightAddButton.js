import React from 'react';
import 'antd/dist/antd.css';
import {
    Button, Modal, Row, Col, DatePicker, Input, InputNumber, message
} from 'antd';
import LocationSelect from "../LocationSelect";
import reqwest from 'reqwest';
import emitter from "../../events";

class FlightAddButton extends React.Component {

    static URL = 'http://127.0.0.1:9999/airline';

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            startLocation: '',
            startLocationWarningVisible: false,
            endLocation: '',
            endLocationWarningVisible: false,
            economyPrice: 0,
            businessPrice: 0
        }
    }

    handleButtonClick = () => {
        this.setState({
            modalVisible: true,
        })
    };

    handleOk = () => {
        const state = this.state;
        if (state.startLocation === '' || state.endLocation === '') {
            if (state.startLocation === '') {
                this.setState({
                    startLocationWarningVisible: true
                })
            }
            if (state.endLocation === '') {
                this.setState({
                    endLocationWarningVisible: true
                })
            }
        } else {
            reqwest({
                url: FlightAddButton.URL,
                method: 'post',
                type: 'json',
                data: {
                    aircraftId: this.props.aircraftId,
                    startTime: this.props.startTime,
                    endTime: this.props.endTime,
                    startLocation: state.startLocation,
                    endLocation: state.endLocation,
                    economyPrice: state.economyPrice,
                    businessPrice: state.businessPrice
                },
                success: (data) => {
                    if (data.status.code === 0) {
                        this.setState({
                            modalVisible: false
                        });
                        const value = [this.props.startTime, this.props.endTime];
                        emitter.emit('updateFlightTable', value);
                    } else {
                        message.error(data.status.msg);
                    }
                },
                error: (e) => {
                    console.error(e);
                    message.error("Server Error");
                }
            });
        }
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        })
    };

    getStartLocation = (value) => {
        this.setState({
            startLocation: value,
            startLocationWarningVisible: false
        })
    };

    getEndLocation = (value) => {
        this.setState({
            endLocation: value,
            endLocationWarningVisible: false
        })
    };

    getEconomyPrice = (value) => {
        this.setState({
            economyPrice: value
        })
    };

    getBusinessPrice = (value) => {
        this.setState({
            businessPrice: value
        })
    };


    render() {
        const state = this.state;
        return (
            <div>
                <Button icon={"plus"} onClick={this.handleButtonClick} ghost={true} type="primary">添加航程</Button>
                <Modal
                    title="添加航程"
                    visible={state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={4}>
                                <span>航班号</span>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.props.aircraftId}
                                    disabled={true}
                                    width={200}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={4}>
                                <span>起飞时间</span>
                            </Col>
                            <Col span={8}>
                                <DatePicker
                                    showTime
                                    value={this.props.startTime}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={4}>
                                <span>降落时间</span>
                            </Col>
                            <Col span={8}>
                                <DatePicker
                                    showTime
                                    value={this.props.endTime}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={4}>
                                <span>出发地</span>
                            </Col>
                            <Col span={8}>
                                <LocationSelect getLocation={this.getStartLocation.bind(this)}/>
                            </Col>
                        </Row>
                    </div>
                    {
                        state.startLocationWarningVisible ?
                            <div style={{marginBottom: 10}}>
                                <Row type="flex" align="middle">
                                    <Col span={8} offset={8}>
                                        <span style={{color: "red"}}>出发地不能为空!</span>
                                    </Col>
                                </Row>
                            </div> :
                            <div/>
                    }
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={4}>
                                <span>目的地</span>
                            </Col>
                            <Col span={8}>
                                <LocationSelect getLocation={this.getEndLocation.bind(this)}/>
                            </Col>
                        </Row>
                    </div>
                    {
                        state.endLocationWarningVisible ?
                            <div style={{marginBottom: 10}}>
                                <Row type="flex" align="middle">
                                    <Col span={8} offset={8}>
                                        <span style={{color: "red"}}>目的地不能为空!</span>
                                    </Col>
                                </Row>
                            </div> :
                            <div/>
                    }
                    {
                        this.props.hasEconomy ?
                            <div style={{marginBottom: 10}}>
                                <Row type="flex" align="middle">
                                    <Col span={4} offset={4}>
                                        <span>经济舱价格</span>
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber
                                            defaultValue={0}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            onChange={this.getEconomyPrice}
                                            min={0}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            : <div/>
                    }
                    {
                        this.props.hasBusiness ?
                            <div style={{marginBottom: 10}}>
                                <Row type="flex" align="middle">
                                    <Col span={4} offset={4}>
                                        <span>商务舱价格</span>
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber
                                            defaultValue={0}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            onChange={this.getBusinessPrice}
                                            min={0}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            : <div/>
                    }
                </Modal>
            </div>
        )
    }
}

export default FlightAddButton;