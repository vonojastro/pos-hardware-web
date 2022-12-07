import express from 'express'
import { addTransaction, deleteTransaction, getTransactionById, getTransactions } from '../controller/transactionsController.js'
const router = express.Router()


router.route('/').get(getTransactions)
router.post('/', addTransaction)
router.route('/:id').get(getTransactionById)
router.route('/:id').get(getTransactionById).delete(deleteTransaction)


export default router