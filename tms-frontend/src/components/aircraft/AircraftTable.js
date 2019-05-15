import React from 'react';
import 'antd/dist/antd.css';
import {
    Table, Row, Col
} from 'antd';
import reqwest from 'reqwest';
import AircraftDetail from './AircraftDetail';
import AircraftDeleteButton from './AircraftDeleteButton'
import AircraftEditButton from './AircraftEditButton'
import emitter from '../../events'

class AircraftTable extends React.Component {

    static ADD_URL = 'http://127.0.0.1:9999/aircraft/all';

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
        }
    }

    componentDidMount() {
        this.getTableData();
        // 组件装载完成以后声明一个自定义事件
        this.eventEmitter = emitter.addListener('updateAircraftTable', () => {
            this.getTableData();
            //console.log("updateAircraftTable");
        });
    }

    componentWillUnmount() {
        //emitter.removeListener('updateAircraftTable');
    }

    getTableData = () => {
        //console.log("get table data");
        this.setState({
            loading: true,
        });
        reqwest({
            url: AircraftTable.ADD_URL,
            method: 'get',
            type: 'json',
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
                    alert(data.status.msg);
                }
            },
            error: (e) => {
                console.log(e);
                this.setState({
                    loading: false,
                });
                alert("Server Error");
            }
        });
    };

    render() {
        const state = this.state;
        const columns = [{
            title: '航班信息',
            dataIndex: 'detail',
            render: (data) => {
                return (
                    <Row>
                        <Col span={20}>
                            <AircraftDetail data={data}/>
                        </Col>
                        <Col span={2}>
                            <AircraftEditButton data={data}/>
                        </Col>
                        <Col span={2}>
                            <AircraftDeleteButton aircraftId={data.aircraftId}
                                                  updateTable={this.getTableData.bind(this)}/>
                        </Col>
                    </Row>
                )
            },
        }];

        return (
            <div>
                <Table
                    //rowSelection={rowSelection}
                    //bordered={true}
                    columns={columns}
                    rowKey={record => record.aircraftId}
                    dataSource={state.dataSource}
                    pagination={false}
                    loading={state.loading}
                />
            </div>
        )
    }
}

export default AircraftTable;