const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors(
    {
    origin:"https://e-commerce-frontend-ch7m.onrender.com",
        // origin:"http://localhost:3000",
    credentials:true
}
  
));



app.use("/api",router)

const PORT = 8080 || process.env.PORT;

    app.listen(PORT ,()=>{  
        connectDB()   
        console.log("Server is running");
    })

