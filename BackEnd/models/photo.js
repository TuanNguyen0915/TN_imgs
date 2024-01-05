import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  addBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decs: { type: String },
  url: { type: String, required: true },
  category: { type: String },
  addBy: { type: Schema.ObjectId.ObjectId, ref: 'User' },
  comments: [commentSchema]
}, { timestamps: true })

const Photo = mongoose.model('Photo', photoSchema)

export default Photo