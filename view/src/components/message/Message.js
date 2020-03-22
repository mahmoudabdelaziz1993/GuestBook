import React from 'react'
import'./message.css'
function Message({message,current }) {
    let isSentByCurrentUser = false ;

    if (message.author === current._id){
         isSentByCurrentUser = true ;
    }
    console.log("messages",message);
    
    return (

        isSentByCurrentUser ?
        (<div className="messageContainer justifyEnd">
            <p className="sentText pr-10">me</p>
            <div className="messageBox backgroundBlue" >
                <p className="messageText colorWhite">{message.content}</p>
            </div>
        </div>)
        :
        (<div className="messageContainer justifyStart">
            <p className="sentText pr-10">{message.name}</p>
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{message.content}</p>
            </div>
        </div>)

    )
}

export default Message
