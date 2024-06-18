const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');
const getUser = require('./middlewares/getUser');



const app = express();

const PORT = process.env.PORT || 3000;


// Connect to the database

const connectDB = require('./config/db');
connectDB();

// middlewares

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine

app.set('view engine', 'ejs');


//routes

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.get('*', getUser);

app.get('/', verifyToken, (req, res)=>{
  res.render('home');
})


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});
