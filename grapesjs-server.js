const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const page = require('./routers/page');
const cors = require('cors');
const ejs = require('ejs');

// Model
const pageModel = require('./models/page');


// Setup express app
const app = express();
app.listen(4040);
app.use(express.json()); //{ limit: '50mb', extended: true }
app.use(express.urlencoded({ extended: false }));

// Fix CORS Error
// app.use(cors()); // Use this after the variable declaration
// var corsOptions = {
//     origin: '*',
//     credentials: true
// };
var corsOptions = {
    origin: '*'
};
// app.use(cors(corsOptions));
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

// setup the view engine
app.engine('html', ejs.renderFile);
app.set('view-engine', 'html');

app.use(express.static('css'));

// Setup Database
mongoose.connect('mongodb://localhost:27017/grapesjsDB', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log('Mongoose - error connecting to the GrapesJS database:', err);
    }
    console.log('Connected successfully to the GrapesJS database');
});

// app.use((request, response, next) => {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Accept-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/page', page.loadPage);
app.post('/page', page.storePage);

app.get('/', function (request, response){
    pageModel.find(function (err, pages){
        response.render('index.html', { htmlContent: pages[pages.length - 1]['gjs-html'], cssContent: pages[pages.length - 1]['gjs-css'] });
    });
});

console.log("Check the page out at https://localhost:4040");