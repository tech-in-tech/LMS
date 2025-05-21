
import mongoose from "mongoose";
const lectureScheme = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true
  },
  videoUrl: {
    tye: String
  },
  publicId: {
    type: String
  },
  isPreviewFree: {
    type: Boolean,
  }
}, { timestamps: true })

export const Lecture = mongoose.model("Lecture",lectureScheme);