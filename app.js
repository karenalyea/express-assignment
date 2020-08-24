/* eslint-disable no-undef */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav =  [{link:'/', title:'Home'},
{link:'/blogs', title:'Blog List' }
 ];

const blogRouter = require('./src/routes/blogRoutes')(nav);

app.use('/blogs', blogRouter);

app.get('/', (req, res) => {
    res.render(
        'index', 
    { 
        nav: [{link:'/', title:'Home'},
    {link:'/blogs', title:'Blog List'}
     ],
     title: 'Liberty Mutual Blog' });
})

app.listen(port, function() {
    debug(`listening on port ${chalk.green(port)}`);
});