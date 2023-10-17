const express = require('express');
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

//Security Lib Imports
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');


//Security middleware implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb' , extended: true}));


//Request rate Limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2000
})
app.use(limiter)



// Database
const mongoose= require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/Schools') // if error it will throw async error
    .then(() => {
        console.log('Database connect success')
    })
    .catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

//Routing implementation
app.use("/api/v1", router);

//undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: '[ * Route not found * ]'
    })
})

module.exports = app ;