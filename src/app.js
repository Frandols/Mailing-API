const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// Import Routes
const appRoutes = require('./routes/router');
const { urlencoded } = require('express');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: ''
}, 'single'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', appRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server

const port = app.get('port');

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});