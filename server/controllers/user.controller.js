import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleatMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";



// Registeration / Signup
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword
    })
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Register"
    })
  }
}



// Login / Signin
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Encorrect Email or Password"
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Encorrect Email or Password"
      })
    }
    generateToken(res, user, `Welcome Back ${user.name}`)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Login"
    })
  }
}



// Logout
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed To Logout"
    })
  }
}



// Get user Profile
// export const getUserProfile =  async(req,res)=>{
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId).select("-password");
//     if(!user){
//       return res.status(404).json({
//         message:"Profile Not Found",
//         success:false
//       })
//     }
//     return res.status(200).json({
//       success:true,
//       user
//     })
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success:false,
//       message:"Failed to load user"
//     })
//   }
// }


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id; // Ensure this is being set correctly in auth middleware
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false
      })
    }
    //  extract the public id of the old image 
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];  //extract the public id
      deleatMediaFromCloudinary(publicId);
    }

    
    // upload new profile photo

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;
    // console.log(photoUrl)

    const updatedData = { name, photoUrl }
    // console.log(updatedData)
    const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password")
    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"Profile Updated successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update profile",
      success: false
    })
  }
}