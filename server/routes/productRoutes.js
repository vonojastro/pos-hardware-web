import express from 'express'
import { addProducts, getProducts } from '../controller/productController.js'

const router = express.Router()


router.route('/').get(getProducts)
router.route('/').post(addProducts)


export default router