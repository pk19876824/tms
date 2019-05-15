import React from 'react';
import 'antd/dist/antd.css';
import {
    Popover, Row, Col, Typography, Icon
} from 'antd';

const {Text} = Typography;

class AircraftDetail extends React.Component {

    render() {
        const data = this.props.data;
        const summary = `${data.model}(${data.type})`;
        const content = (
            <div style={{width: 300}}>
                <div>
                    <div style={{padding: '10px 20px'}}>
                        <Text style={{color: '#3587ee'}}>机型</Text>
                        <Text style={{marginLeft: 50}}>{data.model}</Text>
                    </div>
                    <div style={{padding: '0px 20px'}}>
                        <Text style={{color: '#3587ee'}}>类型</Text>
                        <Text style={{marginLeft: 50}}>{data.type}</Text>
                    </div>
                    <div style={{padding: '10px 20px'}}>
                        <Text style={{color: '#3587ee'}}>餐食</Text>
                        <Text style={{marginLeft: 50}}>{data.meal}</Text>
                    </div>
                </div>
                {
                    data.hasEconomy ?
                        <div style={{padding: '10px', borderTop: 'dashed 1px'}}>
                            <Row>
                                <Col span={6}>
                                    <Text type="secondary">经济舱</Text>
                                </Col>
                                <Col span={14}>
                                    <div>
                                        <Text>座位总数:</Text>
                                        <Text style={{marginLeft: 10}}>{data.economyConfig.seatNum}</Text>
                                    </div>
                                    <div>
                                        <Text>座位间距:</Text>
                                        <Text style={{marginLeft: 10}}>{data.economyConfig.seatSpacing}cm</Text>
                                    </div>
                                    <div>
                                        <Text>座位宽度:</Text>
                                        <Text style={{marginLeft: 10}}>{data.economyConfig.seatWidth}cm</Text>
                                    </div>
                                    <div>
                                        <Text>可倾斜度:</Text>
                                        <Text style={{marginLeft: 10}}>{data.economyConfig.rake}˚</Text>
                                    </div>
                                </Col>
                                <Col span={4}>
                                    {
                                        data.economyConfig.tv ?
                                            <div>
                                                <Icon type="youtube"/>
                                                <Text style={{marginLeft: 5}}>tv</Text>
                                            </div>
                                            : <div/>
                                    }
                                    {
                                        data.economyConfig.wifi ?
                                            <div>
                                                <Icon type="wifi"/>
                                                <Text style={{marginLeft: 5}}>wifi</Text>
                                            </div>
                                            : <div/>
                                    }
                                </Col>
                            </Row>
                        </div>
                        : <div/>
                }
                {
                    data.hasBusiness ?
                        <div style={{padding: '10px', borderTop: 'dashed 1px'}}>
                            <Row>
                                <Col span={6}>
                                    <Text type="secondary">商务舱</Text>
                                </Col>
                                <Col span={14}>
                                    <div>
                                        <Text>座位总数:</Text>
                                        <Text style={{marginLeft: 10}}>{data.businessConfig.seatNum}</Text>
                                    </div>
                                    <div>
                                        <Text>座位间距:</Text>
                                        <Text style={{marginLeft: 10}}>{data.businessConfig.seatSpacing}cm</Text>
                                    </div>
                                    <div>
                                        <Text>座位宽度:</Text>
                                        <Text style={{marginLeft: 10}}>{data.businessConfig.seatWidth}cm</Text>
                                    </div>
                                    <div>
                                        <Text>可倾斜度:</Text>
                                        <Text style={{marginLeft: 10}}>{data.businessConfig.rake}˚</Text>
                                    </div>
                                </Col>
                                <Col span={4}>
                                    {
                                        data.businessConfig.tv ?
                                            <div>
                                                <Icon type="youtube"/>
                                                <Text style={{marginLeft: 5}}>tv</Text>
                                            </div>
                                            : <div/>
                                    }
                                    {
                                        data.businessConfig.wifi ?
                                            <div>
                                                <Icon type="wifi"/>
                                                <Text style={{marginLeft: 5}}>wifi</Text>
                                            </div>
                                            : <div/>
                                    }
                                </Col>
                            </Row>
                        </div>
                        : <div/>
                }

            </div>
        );
        return (
            <div>
                <div>
                    <Text strong>{data.aircraftId}</Text>
                </div>
                <Popover placement="bottomLeft" content={content} trigger="hover">
                    <a>{summary}</a>
                </Popover>
            </div>
        )
    }
}

export default AircraftDetail;