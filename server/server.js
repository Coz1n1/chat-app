const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express();
const http = require('http')
const { Server } = require('socket.io')

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log(`user:  ${socket.id}`)

    socket.on('join', (data) => {
        socket.join(data)
        console.log(`ID: ${socket.id} joined room: ${data}`)
    })
    socket.on("send", (data) => {
        socket.to(data.room).emit("getting", data)
    })

    socket.on('disconncet', () => {
        console.log("User disconnected", socket.id)
    })
})


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "userId",
    secret: "important",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 10000000,
    }
}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'users'
})

app.post('/register', (req, res) => {
    const user = req.body.username
    const pass = req.body.userpassword

    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            "SELECT * FROM registered WHERE name = ?",
            user,
            (err, result) => {
                if (result.length > 0) {
                    res.json("exists")
                } else {
                    db.query(
                        "INSERT INTO registered ( name, password) VALUES (?,?)",
                        [user, hash],
                        (err, result) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json("registered")
                            }
                        }
                    )
                }
            }
        )
    })

});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ log: true, user: req.session.user })
    } else {
        res.send({ log: false })
    }
})

app.post('/login', (req, res) => {
    const user = req.body.username
    const pass = req.body.userpassword

    db.query(
        "SELECT * FROM registered WHERE name = ?",
        user,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                bcrypt.compare(pass, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result
                        console.log(req.session.user)
                        res.json(user)
                    } else {
                        res.json({ com: "wrong combination" })
                    }
                })
            } else {
                res.json({ com: "Wrong username" })
            }

        }
    )
})

app.post('/logout', (req, res) => {
    req.session.user.destroy()
})

server.listen(3002, function () {
    console.log("ruszył 3002")
});