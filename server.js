const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path');

const app = express();
app.use(cors()); 
app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log('Listening on port', port); 
});

//const conn = process.env.MONGODB_URI || 'mongodb://localhost/27017/todo-app'
// mongoose.connect(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false 
// });