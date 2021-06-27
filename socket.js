let io

module.exports = {
    init: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
        return io
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket io is not initialised')
        }
        return io
    }
}