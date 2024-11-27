const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = async () =>
{
   try{
       await mongoose.connect(process.env.DATABASE_URL,{

       });
       console.log("DB connection is successfull");
   }catch(err)
   {
      console.log(err);
      console.log(err.message);
      console.log("DB connection issues");
      process.exit(1);
   }
};
 module.exports =dbConnect;