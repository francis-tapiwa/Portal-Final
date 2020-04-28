const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 1400;
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const cuid = require('cuid');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const flash = require('express-flash');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./Models/users');
const Message = require('./Models/messages');
const Queue = require('./Structures/Queue');
const Quicksort = require('./Structures/Quicksort');
var batch = new Queue();

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                User.findOne({ username: username }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'bad username' });
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if (response !== true) {
                                console.log('passwords do not match');
                                return done(null, false, { message: 'passwords do not match' });
                            }
                            console.log('user found & authenticated');
                            return done(null, user);
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'secret',
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({ username: jwt_payload.id })
                .then(user => {
                    if (user) {
                        console.log('user found in db in passport');
                        done(null, user);
                    } else {
                        console.log('user not found in db');
                        done(null, false);
                    }
                });
        } catch (err) {
            done(err);
        }
    }),
);

const db = mongoose.connect(process.env.DB_URL,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
);

io.on('connection', socket => { console.log('Connected...') })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookiParser())
app.use(flash())
app.use(passport.initialize())

async function create_user(req, res) {
    req.body.password = await promisify(bcrypt.hash)(req.body.password, 10)
    var user = new User(req.body);
    await user.save();
    console.log('Saved!' + req.body.username);
}

    async function sendMessage(req, res) {
        var message = new Message(req.body);
        batch.enqueue(message);
        await batch.process(message);
        res.sendStatus(200)
        console.log('Invoked...' + message)
        console.log(batch.peek());
        console.log(batch.isEmpty());
}

async function getMessages(req, res) {
    await Message.find({}, 'message time from to', function (err, docs) {
        if (!err) {
            res.send({ messages: docs });
        }
    }).sort({ true_time: -1 })
}

async function getInbox(req, res) {
    await Message.find({ to: 'Velvet' }, 'message time from to', function (err, docs) {
        if (!err) {
            const result = []
            const map = new Map()
            for (doc of docs) {
                if (!map.has(doc.from)) {
                    map.set(doc.from, true);
                    result.push({
                        message: doc.message,
                        from: doc.from,
                        time: doc.time,
                        to: doc.to
                    });
                }
            }

            res.send({ messages: result });
        }
    }).sort({ time: -1 })
}

app.use(require('./Passport-Config/jwt'))
app.post('/create', create_user);
app.post('/send', sendMessage);
app.get('/messages', getInbox);
app.get('/chats', getMessages);

server.listen(port, () => console.log(`Server is running on port: ${port}`));