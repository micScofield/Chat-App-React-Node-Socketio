import { Fragment, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import socketClient from 'socket.io-client'

import ChatHome from './ChatHome'
import ChatRoom from './ChatRoom'

// const SERVER = 'http://localhost:5000'

const Dashboard = props => {

    const [displayName, setDisplayName] = useState('')
    const [displayRoomname, setDisplayRoomname] = useState('')

    // useEffect(() => {
    //     const socket = socketClient(SERVER)
    //     return () => socket.disconnect()
    // }, [])

    const [showChatRoom, setShowChatRoom] = useState(false)

    const showRoomHandler = (username, roomname) => {
        setShowChatRoom(prevState => !prevState)
        if (username && roomname) {
            setDisplayName(username)
            setDisplayRoomname(roomname)
        }
    }

    let dashboard = (
        <div className='container'>
            <div className='my-top-1'>
                {!showChatRoom && <ChatHome showRoomHandler={showRoomHandler} />}
                {showChatRoom && <ChatRoom showRoomHandler={showRoomHandler} displayName={displayName} displayRoomName={displayRoomname} />}
            </div>
        </div>
    )

    return dashboard
}

export default Dashboard