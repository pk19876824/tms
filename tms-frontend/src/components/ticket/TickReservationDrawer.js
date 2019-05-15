import React from 'react';
import 'antd/dist/antd.css';
import {
    Drawer, Row, Col, Button, Typography
} from 'antd';
import reqwest from 'reqwest';
import BuyTicketButton from "./BuyTicketButton";

const Text = Typography;

class TickReservationDrawer extends React.Component {

    static URL = 'http://127.0.0.1:9999/ticket';

    constructor(props) {
        super(props);
        this.state = {
            drawerVisible: false,
            dataSource: []
        }
    }

    componentDidMount() {
        this.getDrawerData();
    }

    showDrawer = () => {
        this.getDrawerData();
        this.setState({
            drawerVisible: true
        })
    };

    closeDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    };

    getDrawerData = () => {
        const airlineId = this.props.airlineId;
        reqwest({
            url: TickReservationDrawer.URL,
            method: 'get',
            type: 'json',
            data: {
                airlineId: airlineId
            },
            success: (data) => {
                if (data.status.code === 0) {
                    this.setState({
                        dataSource: data.data
                    })
                } else {
                    alert(data.status.msg);
                }
            },
            error: (e) => {
                console.error(e);
                alert("Server Error");
            }
        });
    };

    render() {

        const state = this.state;
        const aircraftId = this.props.aircraftId;

        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>订票</Button>
                <Drawer
                    placement="bottom"
                    visible={state.drawerVisible}
                    onClose={this.closeDrawer}
                >
                    <Row type="flex" align="middle">
                        <Col span={8}>
                            <Text style={{fontSize: 36, color: '#393939', paddingTop: 50, paddingBottom: 50}}>
                                {aircraftId}
                            </Text>
                        </Col>
                        <Col span={16}>
                            {
                                state.dataSource.map((item) => {
                                    //console.log(JSON.stringify(item));
                                    const color = item.cheapestSeatFlag ? '#ac2217' : '#ee6f2d';
                                    return (
                                        <Row type="flex" align="middle">
                                            <Col span={6}>
                                                <Text style={{fontSize: 24}}>
                                                    {item.seatDescription}
                                                </Text>
                                            </Col>
                                            <Col span={6}>
                                                <span style={{float: 'top'}}>¥</span>
                                                <span style={{fontSize: 36, color: color}}>{item.minPrice}</span>
                                                <span>起</span>
                                            </Col>
                                            <Col span={6}>
                                                <span>剩余:</span>
                                                <span style={{fontSize: 24}}>{item.amount}</span>
                                            </Col>
                                            <Col span={6}>
                                                <BuyTicketButton
                                                    type="primary"
                                                    data={item}
                                                    startLocation={this.props.startLocation}
                                                    endLocation={this.props.endLocation}
                                                    startTime={this.props.startTime}
                                                    endTime={this.props.endTime}
                                                    closeDrawer={this.closeDrawer.bind(this)}
                                                >预定
                                                </BuyTicketButton>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                </Drawer>
            </div>
        );
    }
}

export default TickReservationDrawer;