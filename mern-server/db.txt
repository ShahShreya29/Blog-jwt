const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blogApp')

var db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to Mongodb');
})

db.on('error',(error)=>{
    console.error('connection error',error);
})

module.exports = mongoose