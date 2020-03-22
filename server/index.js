require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const router = require('./router');
const authRouter = require('./auth');
const User = require('./models/User');
const Messages = require('./models/Messages');
const jwt = require('jsonwebtoken');

/** Setup the server socket.io */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let cors = require('cors');
let bodyParser = require('body-parser');

const Message = require('./models/Messages');


// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('open', () => { console.log(" connected to db "); });

// serve the front-end application 
app.use(express.static(path.join(__dirname, '..', 'view', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
// app Router 
app.use(router);
app.use('/auth', authRouter)


/** Io connection */
io.on("connection", async (socket) => {
    console.log(" user connected ....");
    socket.on('join', async ({ token }, cb) => {
        let x = token.token
        console.log("x :", x)
        let payload = await jwt.verify(x, process.env.JWT_TOKEN_SEC);
        let user = await User.findById(payload.id);
        socket.emit("current",user);
        socket.emit('message', ({ name: "admin", content: `hi ${user.name}`, author: "5e7697de25fbee248c376ee8" }));
        socket.broadcast.emit('message', { name: "admin", content: `${user.name} has joined welcome him plz `, author: "5e7697de25fbee248c376ee8" })
    });
    //Sent messages 
    socket.on('sentMessage', async ({ content, token }, cb) => {

        try {
            let x = token.token
            console.log("x :", x)
            let payload = await jwt.verify(x, process.env.JWT_TOKEN_SEC);
            let {name , id } = await User.findById(payload.id);
            const message = new Message({ content, name,author:id });
            await message.save();
            io.emit("message", message);
            cb();
        } catch (error) {
            console.log(error);
        }

    });
    socket.on("deleteMessage",async (id,cb)=>{
        try {
            await Messages.findByIdAndDelete(id);
            cb();
        } catch (error) {
            console.log(error);
        }
    })
    socket.on('disconnect', () => { console.log("user left ...") })
})




// io.on('connection', async socket => {

//     // Send the last messages to the user.  
//     try {
//         let messages = await Message.find().sort({ createdAt: -1 }).limit(4);
//         socket.emit('init', messages);
//     } catch (error) {
//         console.error(error);
//     }

//     // Listen to connected users for a new message.
//     socket.on('message', async msg => {

//         try {
//             let { content, name } = msg;
//             const nwmsg = new Message({ content, name });
//             await nwmsg.save();
//             // Notify all other users about a new message.
//             socket.broadcast.emit('push', msg);
//         } catch (error) {
//             console.error(error);
//         }
//     })

// })



http.listen(process.env.PORT)
    .on('listening', () => console.log(` app is on live now on http://localhost:${process.env.PORT}`))
