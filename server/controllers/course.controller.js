import { Course } from "../models/course.model.js";


// creat course
export const createCourse = async(req,res)=>{
  try {
    const {courseTitle,category} = req.body;
    if(!courseTitle || !category){
      return res.status(400).json({
        message:"Course Title and category is Required.",
        success:false
      })
    }
    const course = await Course.create({
      courseTitle,
      category,
      category:req.id
    })
return res.status(201).json({
  course,
  message:"Course Created Successfully.",
  success:true
})
  } catch (error) {
    return res.status(500).json({
      message:"Failed to create course",
      success:false
    })
  }
}