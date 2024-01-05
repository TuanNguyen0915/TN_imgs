import User from '../models/user.js'
import jwt from 'jsonwebtoken'


// -------------------- CREATE TOKEN --------------------
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

// -------------------- REGISTER --------------------
const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      res.status(404)
      throw new Error('This email has already register')
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const token = generateToken(user._id)
    const { password, ...rest } = user._doc
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) // 2days
    })
    return res.status(201)
      .json({ success: true, message: 'Create account successfully', user: rest, token 
    })

  } catch (error) {
    res.status(500)
    next(error)
  }
}

// -------------------- GOOGLE OAUTH --------------------
const OAth = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      // generatePassword for first time and create account
      const tempPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      user = await User.create({
        email: req.body.email,
        password: tempPassword,
        name: req.body.name,
        avatar: req.body.avatar
      })
    }
    const token = generateToken(user._id)
      const { password, ...rest } = user._doc
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) // 2days
      })
      return res.status(201)
        .json({
          success: true, message: 'Login successfully', user: rest, token
        })
  } catch (error) {
    res.status(500)
    next(error)
  }
}

// ---------------------- LOGIN -------------------------
const login = async (req,res,next) => {
  try {
    
  } catch (error) {
    res.status(500)
    throw new Error(err)
  }
}

export { register, OAth, login }