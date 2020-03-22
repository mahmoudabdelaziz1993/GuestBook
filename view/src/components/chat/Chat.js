import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import './chat.css';
import InfoBar from '../infoBar/InfoBar';
import Input from './input/Input';
import Messages from './messages/Messages';
let socket;
function Chat({ location }) {
    let EndPoint = 'localhost:5000'

    const [messages, setMessages] = useState([])
    const [content, SetContent] = useState('');
    const [token ,setToken ] =useState(queryString.parse(location.search))
    const [current ,setCurrent] = useState('');
     
    useEffect(() => {
        socket = io(EndPoint)
        socket.emit('join', { token }, () => {
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [EndPoint, location.search]);

    useEffect(() => { socket.on('message', message => setMessages([...messages, message])) }, [messages])
    useEffect(() => {socket.on('current', (user)=>setCurrent(user))}, [current])

    // Send message handler 
    const sendMessage = (event) => {
        event.preventDefault();
        if (content) {
            socket.emit("sentMessage", { content, token }, () => SetContent(''));
        }
    }
    
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar/>
                <Messages messages={messages} current={current}/>
                <Input content={content} sendMessage={sendMessage} SetContent={SetContent} />
            </div>
        </div>
    )
}

export default Chat
