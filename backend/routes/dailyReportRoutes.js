import express from 'express'
import { addDailyReport, getDailyreport } from '../controller/dailyReportController.js'

const router = express.Router()

router.route('/').get(getDailyreport)
router.post('/', addDailyReport)


export default router