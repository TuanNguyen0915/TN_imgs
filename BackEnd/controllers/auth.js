import User from '../models/user.js'

const register = async (req,res,next) => {
  try {
    let user = await User.findOne({email: req.body.email})
    if (user) {
      res.status(404)
      return next('This email has already register')
    }
  } catch (error) {
    
  }
}