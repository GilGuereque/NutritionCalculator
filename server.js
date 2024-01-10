// Set up Express app
const express = require('express');
const app = express();
const axios = require('axios'); // Import axios
const PORT = process.env.PORT || 2121 ;
require('dotenv').config({ path: './config/.env' }); // Import dotenv and configure it to load values from .env file

// Set up the Routes
const mainRoutes = require('./routes/main');


// Set up middleware for Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use Routes
app.use('/', mainRoutes);

// TODO implement this GET request using the Routes & Controllers pattern
// Set up GET request to Nutrition API
app.get('/getNutrition', (req, res) => {
    const query = req.query.food;
    const apiKey = process.env.YOUR_API_KEY; // Replace with your API key

    axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
        headers: {
            'X-Api-Key': apiKey,
        },
    })
    .then(response => {
        const nutritionData = response.data;
        res.json(nutritionData); // Send data to client
    })
    .catch(error => {
        console.error('Error fetching nutrition data:', error);
        // Log more details of the error
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        res.status(500).json({ error: 'Error fetching nutrition data' }); // Send error message to client
    });
});

// Set up PORT connection
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});