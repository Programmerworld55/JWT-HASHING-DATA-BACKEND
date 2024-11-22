const express=require('express')
const connectDB=require('./config/db.js')
const databaseroutes=require("./routes/databaseroutes.js")
const authroutes=require('./routes/authroutes.js')
const cors=require('cors')



const app=express()
//......................
app.use(cors());
// app.options('*', cors());

// const cors = require('cors');


// app.use(cors({
//   origin: 'http://localhost:3000', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Optional: if you want to allow cookies/authentication headers
// }));




app.use(express.json());

// connect to db 
connectDB()
// .....................
app.use('/data',databaseroutes)
app.use('/auth',authroutes)



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server is running at port : ",port)
})





