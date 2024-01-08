// Set up Express app
const express = require('express');
const app = express();
const PORT = 2121 || process.env.PORT;


// Set up the Routes
const mainRoutes = require('./routes/main');


// Set up middleware for Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use Routes
app.use('/', mainRoutes);


// Set up PORT connection
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});