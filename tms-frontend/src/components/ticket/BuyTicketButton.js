import React from 'react';
import 'antd/dist/antd.css';
import {
    Modal, Row, Col, Button, Typography, Icon, message
} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment'
import emitter from "../../events";

const Text = Typography;

class BuyTicketButton extends React.Component {

    static URL = 'http://127.0.0.1:9999/ticket';

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false
        }
    };


    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    };

    showModal = () => {
        this.setState({
            modalVisible: true
        })
    };

    handleOk = () => {
        this.buyTicket();
    };

    buyTicket = () => {
        this.setState({
            confirmLoading: true
        });
        reqwest({
            url: BuyTicketButton.URL,
            method: 'put',
            type: 'json',
            data: {
                ticketId: this.props.data.cheapestTicketId,
                ownerId: 1
            },
            success: (data) => {
                if (data.status.code === 0) {
                    this.setState({
                        confirmLoading: false,
                        modalVisible: false,
                    });
                    message.success("出票成功!");
                    this.props.closeDrawer();
                    //const {startLocation, endLocation, startTime} = this.props;
                    //emitter.emit('updateTicketTable', moment(startTime).startOf('day'), moment(startTime).endOf('day'), startLocation, endLocation);
                } else {
                    this.setState({
                        confirmLoading: false,
                        modalVisible: false,
                    });
                    message.warn(data.status.msg);
                }
            },
            error: (e) => {
                console.error(e);
                this.setState({
                    confirmLoading: false,
                });
                message.error("Server Error");
            }
        });
    };

    render() {
        const state = this.state;
        const {data, startLocation, endLocation, startTime, endTime} = this.props;
        console.log("data:" + JSON.stringify(data));
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>预定</Button>
                <Modal
                    title="确认购买？"
                    visible={state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    centered
                    okText={"确定"}
                    cancelText={"取消"}
                    confirmLoading={state.confirmLoading}
                >
                    <div style={{marginBottom: 10}}>
                        <Row type="flex" align="middle">
                            <Col span={4} offset={7}>
                                <div style={{textAlign: "center"}}>
                                    <Text style={{fontSize: 24}} type="warning">{startLocation}</Text>
                                </div>
                            </Col>
                            <Col span={2}>
                                <div style={{textAlign: "center"}}>
                                    <Icon type="arrow-right"/>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div style={{textAlign: "center"}}>
                                    <Text style={{fontSize: 24}} type="warning">{endLocation}</Text>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row>
                            <Col span={6} offset={6}>
                                <div style={{textAlign: "right", marginRight: 10}}>
                                    <Text style={{fontSize: 18}}>金额: </Text>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{textAlign: "left", marginLeft: 10}}>
                                    <span style={{fontSize: 18}}>¥</span>
                                    <span style={{fontSize: 18, color: "red"}}>{data.minPrice}</span>
                                </div>

                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row>
                            <Col span={6} offset={6}>
                                <div style={{textAlign: "right", marginRight: 10}}>
                                    <Text style={{fontSize: 18}}>席别: </Text>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{textAlign: "left", marginLeft: 10}}>
                                    <Text style={{fontSize: 18}}>{data.seatDescription}</Text>
                                </div>

                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <Row>
                            <Col span={6} offset={6}>
                                <div style={{textAlign: "right", marginRight: 10}}>
                                    <Text style={{fontSize: 18}}>起飞时间: </Text>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{textAlign: "left", marginLeft: 10}}>
                                    <Text style={{fontSize: 18}}>{moment(startTime).format('YY/MM/DD HH:mm')}</Text>
                                </div>

                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col span={6} offset={6}>
                                <div style={{textAlign: "right", marginRight: 10}}>
                                    <Text style={{fontSize: 18}}>降落时间: </Text>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{textAlign: "left", marginLeft: 10}}>
                                    <Text style={{fontSize: 18}}>{moment(endTime).format('YY/MM/DD HH:mm')}</Text>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default BuyTicketButton;