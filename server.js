const express = require('express')

const formatMessage = require('./utility/message')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utility/user')

const app = express()
const botName = 'ChatCord Bot'

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
    )
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    next()
})

//Routes
app.get('/', (req, res) => res.status(200).json({ msg: 'Index page' }))

const server = app.listen(5000, () => console.log('Server started on 5000'))

const io = require('./socket').init(server)
io.on('connection', socket => {
    console.log('Client connected');

    //On joining a room, welcome current user and broadcast to other users
    socket.on('joinRoom', ({ username, room }) => {

        //Create a new user and store it somewhere, using memory here and not a DB
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        console.log(user)
        //Welcome current user
        socket.emit('message', formatMessage(botName, `Welcome to ChatCord ${user.username}!`))

        //Broadcasting the message to other users inside the room
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))

        //Send users and room info so that we can maintain side bar to show who is present in the room
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Listen for chat messages
    socket.on('chatMessage', msg => {
        // We need to emit it back to clients on front end
        // console.log(msg)
        console.log('Received chat message', msg)
        //get current user
        const user = getCurrentUser(socket.id)

        //Emit it to everyone inside the room
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    //On disconnect, emit message to all
    socket.on('disconnect', () => {
        console.log('disconnecred...')
        //get current user
        const user = userLeave(socket.id)

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

            //Send users and room info so that we can maintain side bar to show who is present in the room
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})