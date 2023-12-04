import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

//routes

//create JOB || POST
router.post("/create-job", userAuth, createJobController);

//get JOB || GET
router.get("/get-job", userAuth, getAllJobsController);

//update JOBS || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//delete JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//JOBS stats filter || GET
router.get("/job-stats", userAuth, jobStatsController);

export default router;
