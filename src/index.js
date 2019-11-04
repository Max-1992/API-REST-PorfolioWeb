// IMPORT OF MODULES
const app = require('./server');
const dotenv = require('dotenv');


// INITIALIZATION
dotenv.config();


// DATABASE CONNECT
const db = require('./database');
db();


// START THE SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server is running in PORT ${process.env.PORT}`);
});