import React from 'react';
import 'antd/dist/antd.css';
import AircraftTable from "./AircraftTable";
import AirplaneAddDrawer from "./AircraftAddDrawer";

class AircraftSetting extends React.Component {
    render() {
        return (
            <div>
                <AirplaneAddDrawer/>
                <AircraftTable/>
            </div>
        )
    }
}

export default AircraftSetting;