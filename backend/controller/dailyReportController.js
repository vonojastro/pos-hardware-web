import DailyReport from "../model/dailyReportModel.js";
import asyncHandler from "express-async-handler";



// @desc get daily report
// @route GET /api/dailyreport
// @access public
const getDailyreport = asyncHandler(async (req, res) => {
  const dailyreport = await DailyReport.find({});
  res.json(dailyreport);
});


// @desc add daily sales
// @route POST /api/dailyreport
// @access public
const addDailyReport = asyncHandler(async (req, res) => {
  const { totalIn, totalOut } = req.body;

const dailyreport = await DailyReport.create({
   totalIn, 
   totalOut, 
  });

  if (dailyreport) {
    res.status(201).json({
   totalIn: dailyreport.totalIn, 
   totalOut: dailyreport.totalOut, 
    });
  } else {
    res.status(400);
    throw new Error("Daily Report Failed");
  }
});

export { addDailyReport, getDailyreport };
