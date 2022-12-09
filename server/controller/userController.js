
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    res.json({email, password});
  });

  export {authUser}
  