const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = process.env.PORT || 5000

const http = require('http').createServer(app);
const socketio = require('socket.io')
const io = socketio(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', function(req, res){
        res.sendFile(path.json(__dirname, 'client/build', 'index.html'))
    })
}

const User = require('./models/user')
const Room = require('./models/room')
const Message = require('./models/message')

const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "postgres", "postgres", {
  dialect: "postgres"
});

/*sequelize.sync().then(result=>{
    console.log(result);
})
.catch(err=> console.log(err));*/

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        }else{
            res.status(200).send({success: stripeRes})
        }
    })
})

io.on('connection', (socket) => {
    console.log(socket.id)
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        console.log(name)
        const room = new Room({ name });
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error)
        } else {
            console.log('join user', user)
        }
    })
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id);
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        }
        console.log('message', msgToStore)
        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit('message', result);
            callback()
        })

    })
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        })
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});


http.listen(port, () => {
    console.log(`listening on port ${port}`);
});