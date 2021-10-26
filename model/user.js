const mongoose=require('mongoose');
// const url='mongodb://localhost:27017/crudapp';
// mongoose.connect(url,{useNewUrlParser:true})
// const db=mongoose.connection

const userSchema=new mongoose.Schema({

    //id:db.customers.find().Count()+1,
    Uid:{type:Number, required:true},
    balance:{type:Number, required:true},
    name:{type:String, required:true},
    transactionId:{type:Number, required:true},
    date:{type:Date}
});

module.exports=mongoose.model('users',userSchema);