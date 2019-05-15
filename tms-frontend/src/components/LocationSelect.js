import React from 'react';
import 'antd/dist/antd.css';
import {Select, message} from "antd"
import reqwest from 'reqwest';

const Option = Select.Option;

class LocationSelect extends React.Component {

    static URL = "http://127.0.0.1:9999/city";

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            cities: [],
            loading: false
        };
    }

    onChange = (value) => {
        //console.log(`selected ${value}`);
        this.props.getLocation(value);
        this.setState(
            {value}
        )
    };

    onBlur = () => {
        console.log('blur');
    };

    onFocus = () => {
        console.log('focus');
    };

    onSearch = (val) => {
        console.log('search:', val);
    };

    componentDidMount() {
        this.getData();
    };

    getData = () => {
        this.setState({
            loading: true
        });
        reqwest({
            url: LocationSelect.URL,
            method: 'get',
            type: 'json',
            success: (data) => {
                if (data.status.code === 0) {
                    this.setState({
                        loading: false,
                        cities: data.data
                    })
                } else {
                    this.setState({
                        loading: false,
                        cities: []
                    });
                    message.error(data.status.msg);
                }
            },
            error: (e) => {
                this.setState({
                    loading: false,
                    cities: []
                });
                message.error(e);
            }
        })
    };

    render() {
        const {cities, loading} = this.state;
        return (
            <Select
                showSearch
                style={{width: 200}}
                placeholder={this.props.placeholder}
                optionFilterProp="children"
                onChange={this.onChange}
                loading={loading}
                //onFocus={this.onFocus}
                //onBlur={this.onBlur}
                //onSearch={this.onSearch}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {
                    cities.map((city) => {
                        return <Option
                            value={city}
                            key={city}
                        >{city}
                        </Option>
                    })
                }
            </Select>
        )
    }
}

export default LocationSelect;