// IMPORT OF MODULES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fileUpload = require('express-fileupload');
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
app.use(fileUpload({ useTempFiles: true }));
app.use(compression());


// ROUTES
router(app);

// SETTINGS STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

