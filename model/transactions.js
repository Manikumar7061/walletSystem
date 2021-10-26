const mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({

    //id:db.customers.find().Count()+1,
    Uid:{type:Number, required:true},
    amount:{type:Number, required:true},
    description:{type:String, required:true},
    transactionId:{type:Number, required:true},
    date:{type:String, required:true}
});

module.exports=mongoose.model('transactions',transactionSchema);