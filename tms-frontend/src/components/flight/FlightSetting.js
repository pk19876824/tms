import React from 'react';
import 'antd/dist/antd.css';
import {
    Layout, AutoComplete, Select,
} from 'antd';
import FlightSearchBox from "./FilghtSearchBox";
import FlightTable from "./FlightTable";


class FlightSetting extends React.Component {
    render() {
        return (
            <div>
                <FlightSearchBox/>
                <FlightTable/>
            </div>
        )
    }
}

export default FlightSetting;