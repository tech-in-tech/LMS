import express from "express"
import isAuthenticated from "../meddleware/isAuthenticated.js";
import { createCourse, editCourse, getAllCreaterCourses } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.route("/").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getAllCreaterCourses)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)

export default router;