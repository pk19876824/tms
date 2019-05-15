import React from 'react';
import 'antd/dist/antd.css';
import {
    Row, Col, Typography
} from 'antd';
import FlightHistoryDrawer from "./FlightHistoryDrawer";

const {Text} = Typography;

class FlightSummary extends React.Component {

    getLocalTime = (nS) => {
        return new Date(nS).toLocaleString().replace(/:\d{1,2}$/, ' ');
    };

    render() {
        const latest = this.props.data.airlines.latest;
        const hasLatest = latest !== undefined && latest !== null;
        return (
            <div>
                {
                    hasLatest ?
                        <Row type="flex" align="middle">
                            <Col span={10}>
                                <div style={{textAlign: "center"}}>
                                    <Text strong style={{fontSize: 36}}>{latest.startLocation}</Text>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Text>{this.getLocalTime(latest.startTime)}</Text>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div style={{textAlign: "center"}}>
                                    <Text style={{fontSize: 24}}>至</Text>
                                </div>
                            </Col>
                            <Col span={10}>
                                <div style={{textAlign: "center"}}>
                                    <Text strong style={{fontSize: 36}}>{latest.endLocation}</Text>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <Text>{this.getLocalTime(latest.endTime)}</Text>
                                </div>
                            </Col>
                        </Row>
                        : <div/>
                }
                <div style={{textAlign: "center"}}>
                    <FlightHistoryDrawer data={this.props.data}/>
                </div>
            </div>
        )
    }
}

export default FlightSummary;