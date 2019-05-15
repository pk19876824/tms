import React from 'react';
import 'antd/dist/antd.css';
import {
    Row, Col, DatePicker,
} from 'antd';
import emitter from '../../events';

const {RangePicker} = DatePicker;

class FlightSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: ''
        }
    }

    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    onOk = (value) => {
        console.log('onOk: ', value);
        emitter.emit('updateFlightTable', value);
    };

    render() {
        return (
            <div style={{margin: "10px 100px"}}>
                <RangePicker
                    showTime={{format: 'HH:mm'}}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['起飞时间', '降落时间']}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </div>
        );
    }
}

export default FlightSearchBox;