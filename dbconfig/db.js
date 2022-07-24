require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(
      process.env.MONGO_CONNECTION_URL,
      {
      },
      (err)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log('connected')
        }
      }
    )
  }

module.exports = connectDB;