import React from 'react';
import 'antd/dist/antd.css';
import {
    Button, message
} from 'antd';
import reqwest from 'reqwest';

class AircraftDeleteButton extends React.Component {

    static URL = 'http://127.0.0.1:9999/aircraft';

    handleDeleteAircraft = () => {
        const aircraftId = this.props.aircraftId;
        reqwest({
            url: AircraftDeleteButton.URL,
            method: 'delete',
            type: 'json',
            data: {
                aircraftId: aircraftId
            },
            success: (data) => {
                if (data.status.code === 0) {
                    this.props.updateTable();
                } else {
                    message.error(data.status.msg);
                }
            },
            error: (e) => {
                console.error(e);
                message.error("Server Error");
            }
        });
    };

    render() {
        return (
            <Button
                icon="delete"
                type="primary"
                ghost
                onClick={this.handleDeleteAircraft}
            >
                删除
            </Button>
        )
    }
}

export default AircraftDeleteButton;