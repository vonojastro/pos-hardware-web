import express from 'express'
import { getProducts } from '../controller/productController.js'

const router = express.Router()


router.route('/').get(getProducts)


export default router