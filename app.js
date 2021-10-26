const express=require('express');
const bodyParser=require('body-parser');
const Routes=require('./Routes/index');
const config=require('./config/dev.json')
const mongoose=require('mongoose');
const app=express();

app.use(express.json());// to detect body requests with json 
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//const url='mongodb://localhost:27017/crudapp';
mongoose.connect(config.database.MONGO_URI,{useNewUrlParser:true})
const con=mongoose.connection

app.use('/wallet', Routes);

con.on('open',()=>{
    console.log("connected..");
})


app.listen(config.server.PORT,(req,res)=>{ 
    console.log("running...")
})