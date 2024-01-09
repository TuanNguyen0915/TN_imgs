import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const decodeUserFromToken = async (req, res, next) => {
  try {
    let token = req.body.token || req.get('Authorization')
    if (token.includes('Bearer ')){
      token = token.replace('Bearer ', '')
    }
    if (!token) {
      res.status(401)
      return next('Not authorized')
    }
    //verify token and get user
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(verified.id).select("-password")
    if (!user) {
      res.status(401)
      return next('User not found')
    }
    req.user = user
    next()
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}