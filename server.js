const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log('Listening on port', port); 
});

// Connect to MongoDB database 
//const conn = process.env.MONGODB_URI || 'mongodb://localhost/27017/lol-team-finder'
// mongoose.connect(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false 
// });
//check if mongoose is connected
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected'); 
// });

const riotAPI = require('./routes/riotAPI');
app.use('/riotAPI', riotAPI);

