require('dotenv').config()
const userRoute = require('./routes/router-user')

const express = require('express');

const connect = require('./config/config.js');

const PORT = process.env.PORT

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())


app.use("/user" , userRoute)

























app.listen( PORT , async () =>{
    try {

        await connect();
        console.log(`listening on port ${PORT}`);
        console.log(`DB connection established`)

    } catch (error) {
        console.log("error >>>>>>>>" , error)
    }

});