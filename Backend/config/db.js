const mongoose=require('mongoose')
const dotenv=require("dotenv")

dotenv.config()

const connectDB=async()=>{
await mongoose.connect(process.env.URI,{
  dbname:"LargeDatabase"
}).then(()=>{
  console.log("connected to database successfully")
}).catch((error)=>{
  console.log("error occured while connecting : ",error)
})
}

module.exports=connectDB