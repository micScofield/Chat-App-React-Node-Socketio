import { Fragment, useEffect, useState } from 'react'

import { connect } from '../../socket-client'

let socket

const ChatRoom = ({ showRoomHandler, displayName, displayRoomName }) => {

    const [userMsg, setUserMsg] = useState('')

    // const [roomname, setRoomname] = useState('')
    const [roomUsers, setRoomUsers] = useState([])

    // const [roomMessages, setRoomMessages] = useState([])

    const leaveRoomHandler = () => {
        if (confirm('Please confirm that you want to leave this room')) {
            showRoomHandler()
        }
    }

    function outputMessage(message) {
        // console.log('room messages', roomMessages)
        // let temp = [...roomMessages]
        // console.log(temp)
        // temp.push(message)
        // console.log(temp)
        // setRoomMessages(temp)

        const div = document.createElement('div')
        div.classList.add('message')

        div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">${message.text}</p>
        `

        document.querySelector('.chat-messages').appendChild(div)
    }

    //Output room name to DOM / sidebar
    // function outputRoomName(room) {
    //     setRoomname(room)
    // }

    //Output room users to DOM / sidebar
    function outputRoomUsers(users) {
        setRoomUsers(users)
    }

    const messageSendHandler = e => {
        e.preventDefault()
        if (userMsg.trim().length === 0) {
            alert('Message can\'t be empty')
        } else {
            console.log('Emitting chatMessage event')
            socket.emit('chatMessage', userMsg)
        }

        setUserMsg('')
    }

    useEffect(() => {
        // Make a socket connection
        socket = connect()

        console.log('Emitting joinroom', displayName, displayRoomName)
        socket.emit('joinRoom', { username: displayName, room: displayRoomName })

        //Message from server (connections, disconnects, chats)
        socket.on('message', message => {
            console.log('Received message event', message)

            //Output the message to the DOM
            outputMessage(message)

            //Scroll down to bottom
            const chatMessages = document.querySelector('.chat-messages')
            chatMessages.scrollTop = chatMessages.scrollHeight
        })

        //Get room and users emitted from server
        socket.on('roomUsers', ({ room, users }) => {
            //Output room name for sidebar
            // outputRoomName(room)
            
            //Output room users for sidebar
            outputRoomUsers(users)
        })

        return () => {
            socket.disconnect()
        }
    }, [displayName, displayRoomName])

    return <Fragment>
        <div className="chat-container">

            <header className="chat-header">
                <h1><i className="fas fa-smile-wink"></i> ChatCord</h1>
                <a id="leave-btn" className="btn" onClick={() => leaveRoomHandler()}>Leave Room</a>
            </header>

            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3><i className="fas fa-comments"></i> Room Name:</h3>

                    <h2 id="room-name">
                        {displayRoomName}
                    </h2>

                    <h3><i className="fas fa-users"></i> Users</h3>

                    <ul id="users">
                        {roomUsers.length !== 0 && roomUsers.map(user => {
                            return <li key={user.username}>{user.username}</li>
                        })}
                    </ul>
                </div>

                {/* <div className="chat-messages">
                    {roomMessages.length !== 0 && roomMessages.map(roomMessage => {
                        return <div className='message' key={roomMessage}>
                            <p className="meta">{roomMessage.username} <span>{roomMessage.time}</span></p>
                            <p className="text">{roomMessage.text}</p>
                        </div>
                    })}
                </div> */}

                <div className='chat-messages'></div>

            </main>

            {/* Chat form container */}
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={e => messageSendHandler(e)}>
                    <input
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        autoFocus
                        value={userMsg}
                        onChange={e => setUserMsg(e.target.value)}
                    />
                    <button className='sendBtn'><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    </Fragment>
}

export default ChatRoom