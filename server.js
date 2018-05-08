const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//store port for Heroku.
const port =  process.env.PORT || 3000;
var app = express();


//set Partials for directory
hbs.registerPartials(__dirname + '/views/partials');
//set express related configurations
app.set('view engine', 'hbs');


//Initiate middleware
app.use((req,res, next) => {
  var now = new Date().toString();
  var logs = `${now}: ${req.method} ${req.url}`;
  console.log(logs);
  fs.appendFile('server.log', logs + '\n');
  next();//if middleware doesnt use next,.... this is necessary when using middleware
});

// app.use((req,res, next) => {
//   res.render('maintenance.hbs');
// });

//set up public folder for html
app.use(express.static(__dirname + '/public')); //dirname stores path to folder directory

//declare helper functions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//link GET Route for site links e.g. /route /about /home
app.get('/', (req, resp) => {
  resp.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Site!!!',
  });
});

app.get('/portfolio', (req, resp) => {
  resp.render('portfolio.hbs', {
    pageTitle: 'Portfolio Page',
    welcomeMessage: 'This is my new Portfolio page!',
  });
});



//Routes for Express Go here..
app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// app.get('/maintenance',(req,res)=>{
//   res.render('maintenance.hbs',{
//
//   });
// });

//bad - send back json with errorMessage.
app.get('/*', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request',
    });
});

app.listen(port,() => {
  console.log(`app is running on port ${port}`);
});
//listen for port 3000, locally for now.
