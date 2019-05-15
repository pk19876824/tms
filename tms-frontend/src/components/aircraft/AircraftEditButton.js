import React from 'react';
import 'antd/dist/antd.css';
import {
    Button
} from 'antd';
import AircraftEditDrawer from './AircraftEditDrawer'

class AircraftEditButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerVisible: false
        }
    }

    handleButtonClick = () => {
        this.setState({
            drawerVisible: true
        })
    };

    closeDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    };

    render() {
        const data = this.props.data;
        console.log('AircraftEditButton data:' + data);
        const state = this.state;
        console.log('AircraftEditButton drawerVisible:' + state.drawerVisible);
        return (
            <div>
                <Button icon="edit" type="primary" ghost onClick={this.handleButtonClick.bind(this)}>编辑</Button>
                <AircraftEditDrawer data={data} drawerVisible={state.drawerVisible}
                                    closeDrawer={this.closeDrawer.bind(this)}/>
            </div>
        )
    }
}

export default AircraftEditButton;