import Image from '../models/image.js'
import User from '../models/user.js'

const uploadImage = async (req, res, next) => {
  try {
    let newImage = await Image.create(req.body)
    let user = await User.findByIdAndUpdate(req.user._id, { $push: { images: newImage } }, { new: true })
    newImage.addBy = user._id
    await newImage.save()
    res.status(201).json({ success: true, message: 'Upload successfully', data: newImage })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}
const allImages = async (req, res, next) => {
  try {
    let images = await Image.find({}).populate('addBy').sort({ createdAt: -1 })
    res.status(200).json({ success: true, message: 'All images', data: images })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const addSaved = async (req, res, next) => {
  try {
    let image = await Image.findById(req.body.imageId)
    if (!image) {
      res.status(404)
      return next('Image not found')
    }
    if (!image.saved.includes(req.body.userId)) {
      image.saved.push(req.body.userId)
      await image.save()
    }
    return res.status(200).json({ success: true, data: image })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const imageDetail = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.imageId).populate('addBy', '-password').populate('comments.addBy', '-password')

    if (!image) {
      res.status(404)
      return next('Image not found')
    }
    return res.status(200).json({ success: true, message: 'Found image info', data: image })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const addComment = async (req, res, next) => {
  try {
    req.body.addBy = req.user
    const image = await Image.findByIdAndUpdate(req.params.imageId, { $push: { comments: req.body } }, { new: true })
    if (!image) {
      res.status(404)
      return next('Image not found')
    }
    return res.status(201).json({ success: true, message: 'Created new comment', data: image })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const photosByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params

    const images = await Image.find({ category: categoryId }).populate('addBy', '-password')
    if (!images) {
      res.status(404)
      return next('category not found')
    }
    return res.status(200).json({ success: true, message: 'Image(s) found', data: images })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

export { uploadImage, allImages, addSaved, imageDetail, addComment, photosByCategory }