const walletDb=require('../Dao/dbdao');

/**
 * 
 * @param {object} res
 * @param {objec} req
 * @returns {object}
 */

//1.wallet Setup
    const setup= async (req,res)=>{
        try{
        const currentDate=new Date();
        const {balance,name}=req.body;
        const transactId=Date.now();
        
        const userid=String(currentDate.getFullYear())+String(currentDate.getMonth()+1)+String(currentDate.getDate())+String(currentDate.getHours())+String(currentDate.getMinutes())+String(currentDate.getSeconds())
        const createddate=currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        
            const cust=await walletDb.createUser(userid,Number(balance),name,transactId,createddate);
            console.log(cust)
            //const{Uid,transactionId,date}=cust;
            res.status(200).send({ID:cust.Uid,Balance:cust.balance,Transaction_Id:cust.transactionId,Name:cust.name,Date:cust.date});
        }
        catch(err){
            res.status(400).send(err);
        }
    }

//2. Transactions

    const transaction= async (req,res)=>{
        const walletid=req.params.id;
        //console.log(walletid)
        const {amount, description}=req.body;
        const transactId=Date.now();
        const currentDate=new Date();
        //const userid=String(currentDate.getFullYear())+String(currentDate.getMonth()+1)+String(currentDate.getDate())+String(currentDate.getHours())+String(currentDate.getMinutes())+String(currentDate.getSeconds())
        const createddate=currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const amt=Number(amount).toFixed(4)
       // console.log(amt);
        try{
            const transacting=await walletDb.transactionLog(walletid,amt,description,transactId,createddate);
            const{transact,updatedUser}=transacting;
            res.status(200).send({Balance:updatedUser.balance,Transaction_Id:transact.transactionId});
        }
        catch(err){
            res.status(400).send(err);
        }
    }

//3.Fetch transactions

    const allTransactions= async (req,res)=>{
        const {walletid,skip,limit}=req.query;
        //console.log(req.query);
        try{
            const userTransactions=await walletDb.usertransactions(Number(walletid),Number(skip),Number(limit));
            if(userTransactions==="err"){
                throw "Transactions not found"
            }
            res.status(200).send(userTransactions);
        }
        catch(err){
            res.status(400).send(err);
        }
    }

//4. Wallet Info

    const getWallet= async (req,res)=>{
        const walletid=req.params.id;
        try{
            const wallet=await walletDb.getWallet(walletid);
            //console.log(wallet);
            if(wallet==="err"){
                throw "wrong wallet id"
            }
            res.status(200).send({ID:wallet.Uid,Balance:wallet.balance,Name:wallet.name,Date:wallet.date});
            
        }
        catch(err){
            res.status(400).send({status:400,msg:err});
        }
    }


    module.exports={ setup, transaction, allTransactions, getWallet}