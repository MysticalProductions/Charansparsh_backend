import { Router } from 'express';
import {
  addTransaction,
  deleteTransaction,
  getTransactions
} from './Transaction.controler.js';

const router = Router();

router.route('/gettransactions').get(getTransactions)
router.route('/addtransactions').post(addTransaction);

router.route('/delete/:id')
  .delete(deleteTransaction);

export default router;
