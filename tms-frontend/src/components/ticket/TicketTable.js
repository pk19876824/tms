import React from 'react';
import 'antd/dist/antd.css';
import {
    Row, Typography, Col, Table, message
} from 'antd';
import AircraftDetail from '../aircraft/AircraftDetail'
import TickReservationDrawer from './TickReservationDrawer'
import reqwest from 'reqwest';
import emitter from "../../events";
import moment from 'moment';

const Text = Typography;

class TicketTable extends React.Component {

    static URL = 'http://127.0.0.1:9999/airline';

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            sorter: '',
            startTime: '',
            endTime: '',
            startLocation: '',
            endLocation: ''
        }
    };

    componentDidMount() {
        this.eventEmitter = emitter.addListener('updateTicketTable', (startTime, endTime, startLocation, endLocation) => {
            this.setState({
                startTime,
                endTime,
                startLocation,
                endLocation
            });
            const sorter = this.state.sorter;
            this.getTableData(startTime, endTime, startLocation, endLocation, sorter);
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            sorter
        });
        const {startTime, endTime, startLocation, endLocation} = this.state;
        if (startTime !== '' && endTime !== '' && startLocation !== '' && endLocation !== '') {
            this.getTableData(startTime, endTime, startLocation, endLocation, sorter);
        }
    };

    getTableData = (startTime, endTime, startLocation, endLocation, sorter) => {
        this.setState({
            loading: true,
        });
        reqwest({
            url: TicketTable.URL,
            method: 'get',
            type: 'json',
            data: {
                startTime: startTime,
                endTime: endTime,
                startLocation: startLocation,
                endLocation: endLocation,
                sortField: sorter.field,
                sortOrder: sorter.order,
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

        const columns = [{
            title: '航班信息',
            dataIndex: 'aircraft',
            render: (data) => {
                return <AircraftDetail data={data}/>
            },
            width: '30%',
        }, {
            title: '起飞时间',
            sorter: true,
            dataIndex: 'startTime',
            width: '20%',
            render: (data) => {
                return <Text style={{fontSize: 36}}>{moment(data).format("HH:mm")}</Text>
            }
        }, {
            title: '到达时间',
            sorter: true,
            dataIndex: 'endTime',
            width: '20%',
            render: (data, rowData) => {
                const dayStep = moment(rowData.endTime).dayOfYear() - moment(rowData.startTime).dayOfYear();
                return (
                    <Row type="flex" align="middle">
                        <Col span={10}>
                            <Text style={{fontSize: 36}}>{moment(data).format("HH:mm")}</Text>
                        </Col>
                        {
                            dayStep === 0 ? <div/> :
                                <Col span={4}>
                                    <a>+{dayStep}天</a>
                                </Col>
                        }
                    </Row>
                )
            }
        }, {
            title: '价格',
            sorter: true,
            dataIndex: 'minPrice',
            width: '20%',
            render: (data, rowData) => {
                const color = rowData.minPriceFlag ? '#ac2217' : '#ee6f2d';
                return (
                    <div>
                        <span style={{float: 'top'}}>¥</span>
                        <span style={{fontSize: 36, color: color}}>{data}</span>
                        <span>起</span>
                    </div>
                )
            }
        }, {
            dataIndex: 'airline',
            render: (colData, rowData, index) => {
                return <TickReservationDrawer
                    aircraftId={rowData.aircraft.aircraftId}
                    airlineId={rowData.airline.id}
                    startLocation={rowData.airline.startLocation}
                    endLocation={rowData.airline.endLocation}
                    startTime={rowData.airline.startTime}
                    endTime={rowData.airline.endTime}
                />
            },
            width: '10%'
        }];

        return (
            <div style={{margin: 16}}>
                <Table
                    columns={columns}
                    rowKey={record => record.airline.id}
                    dataSource={state.dataSource}
                    pagination={false}
                    loading={state.loading}
                    onChange={this.handleTableChange}
                />
            </div>

        )
    }
}

export default TicketTable;