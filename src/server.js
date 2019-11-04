// IMPORT OF MODULES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');


// INITIALIZATION
const app = express();


// ROUTER
const router = require('./network/routes/index.routes');


// MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());


// ROUTES
router(app);


module.exports = app;