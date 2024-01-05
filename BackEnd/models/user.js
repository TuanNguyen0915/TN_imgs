import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
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