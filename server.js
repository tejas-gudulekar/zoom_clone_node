const express = require('express');
const res = require('express/lib/response');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')

app.set('view engine','ejs');
app.use(express.static('public'))


app.get('/', (req,res) => {
    console.log(uuidV4())
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req,res) => {
    console.log("Reached here")
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room', (room_id, user_id) => {
        console.log(`Room ID:${room_id}, User ID:${user_id}`)
    })
})

server.listen('3000', () => console.log(`App is Started on Port 3000`))