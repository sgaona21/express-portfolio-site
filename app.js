const express = require('express');
const app = express();

const portfolioData = require('./data.json');
const projects = portfolioData.projects;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//index routes 
app.get('/', (req, res) => {
    res.render('index', { projects });
})

//about page routes
app.get('/about', (req, res) => {
    res.render('about', { projects });
})

//indivudual project routes 
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects[projectId];

    if (!project) {
        const err = new Error('Project not found.');
        err.status = 404;
        return next(err);
    }

    res.render('project', { project });
})

//404 error handler 
app.use((req, res, next) => {
    const err = new Error('The page you requested doesnt exist.');
    err.status = 404;
    console.log(`404 Error: Status ${err.status}, Message: ${err.message}`);
    next(err);
})

//global error handler 
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'There was a Server Error';
    console.log(`Status: ${err.status}, Message: ${err.message}`);
    res.status(err.status).send(`<h1>Error ${err.status}</h1><p>${err.message}</p>`);
})



app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});