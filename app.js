
const fs = require('fs');
const express = require('express');
const morgan = require("morgan");
const movieslist = require("./models/movies");
const movieslistRouter = require("./router/moviesListRouter");
const moviespatch = require("./router/updateRouter");
const deleteRouter = require("./router/deleteRouter");
const addList = require("./router/addListRouter");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); 
dotenv.config();

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    role: 'manager'
  },
  {
    id: 3,
    username: 'john',
    password: 'john123',
    role: 'user'
  }
];

const app = express();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(express.json());
app.use(morgan("dev"));

// const secret = require('crypto').randomBytes(32).toString('hex');
// console.log(secret);

const router = express.Router();
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: tours.length,
        requestTime: req.requestTime,
        data: {
            tours: tours
        }
    })
}

const getTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            "results": tours.length,
            data: {
                tours: tours,
            }

        })

    })
}

const update = (req, res) => {

    const str = req.params.id;
    const t_id = Number(str.replace(/:/g, ''));

    if (t_id > tours.length) {
        return res.status(400).json({
            status: 'failed',
            results: "invalid ID"
        })
    }

    const t = tours.find(el => el.id === t_id);

    if (req.body) {
        t.name = req.body.name;
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            tours: t
        }
    })
}

const deleteRow = ((req, res) => {

    const str = req.params.id;
    const t_id = Number(str.replace(/:/g, ''));

    if (t_id > tours.length) {
        return res.status(400).json({
            status: 'failed',
            results: "invalid ID"
        })
    }

    const t = tours.filter(el => el.id !== t_id);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(t), err => {
        res.status(201).json({
            status: "success",
            "results": t.length,
            data: {
                tours: t,
            }

        })

    })


})

app.get('/', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ "message": "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ "message": "hello from server", "app": "test", "token": token , role: user.role});
})

app.get('/api/v1/movies', movieslistRouter);
app.post('/api/v1/addmovies', addList );

app.patch('/api/v1/tours/:id', moviespatch);
app.delete('/api/v1/tours/:id', deleteRouter);


module.exports = app;