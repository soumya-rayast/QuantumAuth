const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { dbConnection } = require('./src/config/dbConnection');
const authRoutes = require('./src/routes/user.routes.js')

dotenv.config();

// initialize express
const app = express();
app.use(express.json());

app.use(cors());

// connecting to mongoDB
dbConnection();

// PORT
const PORT = process.env.PORT || 8000;

// routes
app.use('/api/auth', authRoutes)

// default routes 
app.get('/', (req, res) => {
    res.send("API is running ")
})

// listening at PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 