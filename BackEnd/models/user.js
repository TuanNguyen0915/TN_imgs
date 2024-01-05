import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, require:true},
  avatar: { type: String,  default: 'https://i.ibb.co/4pDNDk1/avatar.png' },
  photos: [{type: Schema.Types.ObjectId, ref:'Photo'}]
}, {
  timestamps: true
})

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)

export default User