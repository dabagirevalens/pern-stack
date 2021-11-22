const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes');

const app = express();

//middlewares

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/', routes)

app.listen(5000, _=> console.log('App is listen on port : 5000'));