import express from "express"
import isAuthenticated from "../meddleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getAllCreaterCourses, getCourseById, getCourseLecture } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.route("/").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getAllCreaterCourses)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture)
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture)

export default router;