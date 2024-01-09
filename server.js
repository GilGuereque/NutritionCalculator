// Set up Express app
const express = require('express');
const app = express();
const request = require('request');
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


// Set up GET request to Nutrition API
app.get('/nutrition', (req, res) => {
    const query = req.query.food;

    request.get({
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
        headers: {
            'X-Api-Key': process.env.YOUR_API_KEY
        },
    }, (error, response, body) => {
        if (error) {
            console.error('Request failed:', error);
            res.status(500).json({ error: 'Request to external API failed' }); // Send error message to client
        } else if (response.statusCode !== 200) {
            console.error('Error:', response.statusCode, body.toString('utf8'));
            res.status(response.statusCode).json({ error: 'Request to external API failed' }); // Send error message to client
        } else {
            const nutritionData = JSON.parse(body);
            res.json(nutritionData); // Send data to client
        }
    });
});

// Set up PORT connection
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});