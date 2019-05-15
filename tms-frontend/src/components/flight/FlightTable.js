import React from 'react';
import 'antd/dist/antd.css';
import {
    Row, Col, Table, message
} from 'antd';
import AircraftDetail from "../aircraft/AircraftDetail";
import reqwest from 'reqwest';
import emitter from "../../events";
import FlightAddButton from "./FlightAddButton";
import FlightSummary from "./FlightSummary";

class FlightTable extends React.Component {

    static URL = 'http://127.0.0.1:9999/aircraft/free';

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: false,
            startTime: '',
            endTime: '',
        }
    };

    componentDidMount() {
        //this.getTableData();
        // 组件装载完成以后声明一个自定义事件
        this.eventEmitter = emitter.addListener('updateFlightTable', (value) => {
            this.setState({
                startTime: value[0],
                endTime: value[1],
            });
            this.getTableData(value);
            //console.log("updateFlightTable");
        });
    }

    getTableData = (value) => {
        this.setState({
            loading: true,
        });
        //console.log('getTableData value:' + value);
        reqwest({
            url: FlightTable.URL,
            method: 'get',
            type: 'json',
            data: {
                startTime: value[0],
                endTime: value[1]
            },
            success: (data) => {
                if (data.status.code === 0) {
                    this.setState({
                        loading: false,
                        dataSource: data.data
                    })
                } else {
                    this.setState({
                        loading: false,
                    });
                    message.error(data.status.msg);
                }
            },
            error: (e) => {
                console.error(e);
                this.setState({
                    loading: false,
                });
                message.error("Server Error");
            }
        });
    };


    render() {
        const state = this.state;
        //console.log('startTime:' + state.startTime);
        //console.log('endTime:' + state.endTime);
        const columns = [{
            title: '空闲飞机',
            dataIndex: 'detail',
            render: (data) => {
                return (
                    <Row type="flex" align="middle">
                        <Col span={6}>
                            <AircraftDetail data={data}/>
                        </Col>
                        <Col span={4}>
                            <FlightAddButton
                                startTime={state.startTime}
                                endTime={state.endTime}
                                aircraftId={data.aircraftId}
                                hasEconomy={data.hasEconomy}
                                hasBusiness={data.hasBusiness}
                            />
                        </Col>
                    </Row>

                )
            },
            width: '50%'
        }, {
            title: '最近航程',
            dataIndex: 'airlines',
            align: 'center',
            render: (data, record) => {
                //console.log('record:' + JSON.stringify(record));
                return (
                    <FlightSummary data={record}/>
                )
            },
            width: '25%'
        }, {
            width: '25%'
        }];

        return (
            <div>
                <Table
                    columns={columns}
                    rowKey={record => record.detail.aircraftId}
                    dataSource={state.dataSource}
                    pagination={false}
                    loading={state.loading}
                />
            </div>
        )
    }
}

export default FlightTable;