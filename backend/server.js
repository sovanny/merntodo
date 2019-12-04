let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
let bodyparser = require('body-parser');
let dbConfig = require('./data/db');
let todoRoute = require('./routes/todoitem.route');

//mongoose.Promise = global.Promise; ??
mongoose.connect( dbConfig.db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false } ).then( () => {
    console.log('Database sucessfully connected')
}, err => {
    console.log('Could not connect to database : ' + err)
});

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
app.use('/todos', todoRoute);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.info('Connected to port: ' + port)
});


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

//Catch-all error handler
function errorHandler (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
}