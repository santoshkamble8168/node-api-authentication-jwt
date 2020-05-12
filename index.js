const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Set Env
dotenv.config();

//Connect to DB
mongoose.connect( 
    process.env.DB_CONNECT_LOCAL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB connected')
);

//App middleware
app.use(express.json());

//----Imports Router---
/*User routes 
1. Register
2. Login
*/
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000,()=> console.log('Server is running on port: 3000'));