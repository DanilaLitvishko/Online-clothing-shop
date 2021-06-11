import React from 'react'

const Message = ({text, name}) => {
    return (
        <div>
            <p>{name} : {text}</p>
        </div>
    )
}

export default Message
