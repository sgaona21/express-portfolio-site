const express = require('express');
const app = express();

const portfolioData = require('./data.json');
const projects = portfolioData.projects;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.render('index', { projects });
})

app.get('/about', (req, res) => {
    res.render('about', { projects });
})

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];
    res.render('project', { project });
   
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});