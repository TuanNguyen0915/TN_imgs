import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '2d'})
}

const register = async (req,res,next) => {
  try {
    let user = await User.findOne({email: req.body.email})
    if (user) {
      res.status(404)
      next('This email has already register')
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const token = generateToken(user._id)
    const {password, ...rest} = user._doc
    return res.status(201).json({success: true, message: 'Create account successfully', token, user:rest})

  } catch (error) {
    res.status(404)
    next(error)
  }
}

export {register}