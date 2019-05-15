import React from 'react';
import 'antd/dist/antd.css';
import {
    Typography, DatePicker, Button, Empty, Row, Col, Icon
} from 'antd';
import LocationSelect from '../LocationSelect'
import TicketTable from './TicketTable'
import moment from 'moment';
import emitter from "../../events";

const Text = Typography;

class TicketSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startLocation: '',
            endLocation: '',
            selectTime: '',
        };
    }

    getStartLocation = (value) => {
        this.setState({
            startLocation: value
        })
    };

    getEndLocation = (value) => {
        this.setState({
            endLocation: value
        })
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current <= moment().startOf('day');
    };

    onSelectTime = (moment) => {
        console.log('selectBeginTime:' + moment);
        this.setState({
            selectTime: moment
        })
    };

    onSearch = () => {
        const state = this.state;
        const startTime = moment(state.selectTime).startOf('day');
        const endTime = moment(state.selectTime).endOf('day');
        emitter.emit('updateTicketTable', startTime, endTime, state.startLocation, state.endLocation);
    };

    render() {
        const state = this.state;
        const searchDisabled = state.startLocation === '' || state.endLocation === '' || state.selectTime === null || state.selectTime === '';
        return (
            <div>
                <div style={{margin: 30}}>
                    <Row type="flex" align="middle" justify="space-around">
                        <Col span={4}>
                            <LocationSelect placeholder='出发地'
                                            getLocation={this.getStartLocation.bind(this)}/>
                        </Col>
                        <Col span={4}>
                            <LocationSelect placeholder='目的地' getLocation={this.getEndLocation.bind(this)}/>
                        </Col>
                        <Col span={4}>
                            <DatePicker
                                disabledDate={this.disabledDate}
                                onChange={this.onSelectTime}
                                placeholder={"启程日期"}
                            />
                        </Col>
                        <Col span={10}>
                            <Button
                                type="primary"
                                icon="search"
                                onClick={this.onSearch}
                                disabled={searchDisabled}
                                //ghost
                            >
                                搜索
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div style={{minHeight: 500, margin: '20px,50px'}}>
                    <TicketTable/>
                </div>
            </div>
        )
    }
}

export default TicketSearch;