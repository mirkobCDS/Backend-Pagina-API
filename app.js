const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv/config');

const userRoutes = require('./routes/user.route');
const clasesRoutes = require('./routes/clases.route');

app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/users', userRoutes);
app.use('/clases', clasesRoutes);

app.get('/', (req, res) => {
    res.send('We are on home')
});

mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => console.log('Connected to DB')
);

app.listen(3001);

//mongodb+srv://<username>:<password>@cluster1.jew6whg.mongodb.net/?retryWrites=true&w=majority