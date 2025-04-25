import jwt from "jsonwebtoken"

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '20d' })
  return res.status(200).cookie("token", token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 20 * 24 * 60 * 60 * 1000
  }).json ({
    success:true,
    message,
    user
  })
}