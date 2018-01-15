const express = require('express');
const hbs = require('hbs');
const fileSystem = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fileSystem.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); 
//--dirname -> variable that contains the absolut root to the project

app.get('/', (req, res) => {
    //res.send('Hello Express');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello there! welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Some rendom error occured while handling request'
    });
});

app.listen(port, () => { //callback function to execute when the server is up
    console.log(`Server is up on port ${port}`);
});