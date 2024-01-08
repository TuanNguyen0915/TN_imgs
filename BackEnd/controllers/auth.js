import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
      return next('This email has already register')
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
      .json({
        success: true, message: 'Create account successfully', user: rest, token
      })

  } catch (error) {
    res.status(500)
    return next(error)
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
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) // 2days
    })

    return res.status(201)
      .json({
        success: true, message: 'Login successfully', user: rest, token
      })
  } catch (error) {
    res.status(500)
    return next(error)
  }
}

// ---------------------- LOGIN -------------------------
const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(404)
      return next('This account is not register yet.')
    }
    // check password
    const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
    if (!isPasswordMatching) {
      res.status(404)
      return next('Password not matching')
    }
    const token = generateToken(user._id)
    const { password, ...rest } = user._doc
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) //2days
    })

    return res.status(200)
      .json({ success: true, message: 'Login successfully', user: rest, token })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

// ---------------------- USER DETAILS -------------------------
const userDetails = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId).populate('photos')
    if (!user) {
      res.status(404)
      return next('User not found')
    }
    const { password, ...rest } = user._doc
    return res.status(200).json({ success: true, message: "User found", user: rest })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

// ---------------------- LOGOUT -------------------------
const logout = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      path: '/',
      sameSite: 'none',
      expires: new Date(0),
      httpOnly: true,
      secure: true
    })

    return res.status(200).json({ success: true, message: 'Logout successfully' })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

export { register, OAth, login, logout, userDetails }