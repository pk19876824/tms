import React from 'react';
import './App.css';
import MyLayout from "./components/MyLayout";
import {Layout} from "antd"

const {Header} = Layout;

function App() {
    return (
        <div>
            <Header>
                <h1 style={{color: "white", textAlign: "center"}}>飞机票管理系统</h1>
            </Header>
            <MyLayout/>
        </div>
    );
}

export default App;
