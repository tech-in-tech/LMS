import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleatMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// creat course
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course Title and category is Required.",
        success: false
      })
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id
    })
    return res.status(201).json({
      course,
      message: "Course Created Successfully.",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create course",
      success: false
    })
  }
}


// get All Courses
export const getAllCreaterCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Courses Not Found"
      })
    };
    return res.status(200).json({
      courses,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch courses",
      success: false
    })
  }
}



// Update course API
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;
    let course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found!"
      })
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleatMediaFromCloudinary(publicId); // delete old image
      }
      // upload Thumbnail 
      courseThumbnail = await uploadMedia(thumbnail.path);
    }


    const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    return res.status(200).json({
      course,
      message: "Course Updated Successfully",
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed t create course",
      success: false
    })
  }
}


// get course data by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,

      })
    }
    return res.status(200).json({
      success: true,
      course
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messaget: "Failed to get course by id",
      success: false
    })
  }
}


// Create Lecture
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body
    const { courseId } = req.params
    if (!lectureTitle) {
      return res.status(400).json({
        message: "Lecture Title is required",
        success: false
      })
    }

    // create Lecture
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      lecture,
      message: "Lecture Created Successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create Lecture",
      success: false
    })
  }
}

// Get lecture controller
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures")
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: False
      })
    }
    return res.status(200).json({
      lectures: course.lectures
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get Lecture",
      success: false
    })
  }
}


// Update Lecture controller
export const editLecture = async (req,res)=>{
  try {
    const {isPreviewFree,lectureTitle} = req.body;

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get Lecture",
      success: false
    })
  }
}