const mongoose=require("mongoose")

const LargeDataSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
    content:{
      type:String,
    },
    tags:[{
      type:String
    }],
    metadata:{
      author:{
        type:String
      },
      views:{
        type:Number,
        default:0
      },
      comments:[
        {
          user:String,
          comment:String,
          date:{
            type:Date,default:Date.now
          }
        }
      ]
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
});

const LargeData=mongoose.model('LargeData',LargeDataSchema)
module.exports=LargeData