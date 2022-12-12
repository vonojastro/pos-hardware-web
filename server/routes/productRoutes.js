import express from 'express'
import { addProducts, deleteProduct, getProductById, getProducts } from '../controller/productController.js'

const router = express.Router()


router.route('/').get(getProducts)
router.route('/').post(addProducts)
router.route('/:id').get(getProductById).delete(deleteProduct)


export default router