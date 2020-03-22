import React from 'react'
import './input.css'

function Input( {content , sendMessage , SetContent}) {
    return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={ content }
                onChange={ event => SetContent(event.target.value) }
                onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
            />
            <button className="sendButton" onClick={ e => sendMessage(e) }>Send</button>
        </form>
    )
}

export default Input
