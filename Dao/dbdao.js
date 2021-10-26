const mongoose=require('mongoose');

const users=require('../model/user')
const transactions=require('../model/transactions')


/**
 * walletSystem - add users & transactions
 *              fetch user info & transactions
 * @param {object} details
 * @returns {object}
 */

//Adding wallet user

    const createUser= async (Uid,balance,name,transactionId,date)=>{
        balance=balance.toFixed(4);
        try{
        const user=new users({Uid,balance,name,transactionId,date});
        let res=await user.save()       
        console.log("user created");
        return res;

        }catch(err){
            throw new Error(err);
        }
        
    }

// Transactions storing

    const transactionLog= async (userid,amount,description,transactionId,date)=>{
        let res;
        const Uid=Number(userid);

        try{
        const transaction=new transactions({Uid,amount,description,transactionId,date});
        const transact=await transaction.save()
        let updateUser=await users.findOne({"Uid":Uid})
        //console.log(updateUser)
        updateUser.balance = updateUser.balance + Number(amount);
        updateUser.balance = (updateUser.balance).toFixed(4);
        //console.log(amount,updateUser.balance);
        updateUser.date = date;
        const updatedUser=await updateUser.save()
        console.log("transaction stored");
        res= {transact,updatedUser}
        
        }catch(err){
            res=err;
            console.log(err);
        }
        return res;
    }
    
//3. Transactions fetching

    const usertransactions= async (Uid,skipped,limited)=>{
        const allTrans=await transactions.find({"Uid":Uid}).limit(limited).skip(skipped)
        //console.log(allTrans);
        if(allTrans==null){
            return ("err");
        }
        return allTrans;
    }


//4. Wallet info

    const getWallet= async (userid)=>{
        let res;
        const Uid=Number(userid)
        const user=await users.findOne({"Uid":Uid})
        if(user==null){
            return ("err");
        }
        return user;
    }



module.exports={createUser, transactionLog, usertransactions, getWallet}