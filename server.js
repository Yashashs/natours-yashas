/*eslint-disable */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>
    // console.log(con.connections);
    console.log('DB connection successfu!'));


// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 997
// });

// testTour
//     .save()
//     .then(doc => {
//         console.log(doc);
//     })
//     .catch(err => {
//         console.log('ERROR', err);
//     });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

