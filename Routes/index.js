const express = require('express');
const processor= require('../Processors/index');

const router = express.Router();

/**
 * @path '/wallet'
 * @param {object} req
 */

router.post('/setup',processor.setup)
router.post('/transact/:id',processor.transaction)
router.get('/transactions',processor.allTransactions)
router.get('/:id',processor.getWallet)

module.exports=router;