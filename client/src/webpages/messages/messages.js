import React, { useState, useEffect, Component } from "react";
import { default as Chatkit } from '@pusher/chatkit-server';
import ChatApp from './ChatApp'; 
import axios from 'axios';
import { Badge, Button, Media, PageHeader, Tab, Tabs } from "react-bootstrap";
import "../../styles/messages.css";



class ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }
    changeView() {
        this.props.changeView('signup')
    }

    render() {
        return (
            <div>
                <button className="chat-button" onClick={this.changeView}>Send a message</button>
            </div>
        )
    }
}

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:8ad6b6ca-c9ea-4783-8510-b8132b3b25dc",
  key: "6bc1f077-33dc-4944-a6be-5cac00fb45f3:mmVHnbcSUwDAw0RBhclyLDe/ZizYwgbTzqRnWntktXQ="
})

export default ChatMessage;