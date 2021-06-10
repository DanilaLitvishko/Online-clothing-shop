const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}
const authRoutes = require('./routes/authRoutes')

app.use(cors(corsOptions));

const bodyParser = require('body-parser')
const path = require('path')
const ID = require('./ID')
if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const port = process.env.PORT || 5000

const http = require('http').createServer(app);
const socketio = require('socket.io')
const io = socketio(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(authRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', function(req, res){
        res.sendFile(path.json(__dirname, 'client/build', 'index.html'))
    })
}

const Room = require('./models/room')
const Message = require('./models/message')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

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
    Room.sync({ alter: true })
    Room.findAll({raw:true}).then(rooms=>{
        socket.emit('output-rooms', rooms)
    }).catch(err=>console.log(err));

    socket.on('create-room', name => {
        const id = ID()
        Room.create({
            name: name,
            id: id
        }).then(res=>{
           
        }).catch(err=>console.log(err));
    })
});


http.listen(port, () => {
    console.log(`listening on port ${port}`);
});