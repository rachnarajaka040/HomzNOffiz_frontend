
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connection = async ()=>{
      await mongoose.connect("mongodb+srv://rachna:12345@cluster0.d5ixq3k.mongodb.net/test");
      console.log("connection asltablishlist");
}

module.exports = connection;
