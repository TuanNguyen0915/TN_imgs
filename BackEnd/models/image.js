import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  addBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decs: { type: String },
  url: { type: String, required: true },
  category: { type: String },
  addBy: { type: Schema.Types.ObjectId, ref: 'User' },
  saved: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  comments: [commentSchema]
}, { timestamps: true })

const Image = mongoose.model('Image', imageSchema)

export default Image
