// IMPORT OF MODULES
const db = require('mongoose');

// DATABASE CONNECTION
const connect = async () => {
    try {
        await db.connect(process.env.URL_DB, {
                  useNewUrlParser: true,
                  useCreateIndex: true,
                  useUnifiedTopology: true,
                  useFindAndModify: false
              });
              
              console.log(`Database is connected`);
    } catch (err) {
        console.error(`[Error DB]: ${err}`);
    }
};

module.exports = connect;