import Photo from '../models/photo.js'
import User from '../models/user.js'

const uploadImage = async (req, res, next) => {
  try {
    let newImage = await Photo.create(req.body)
    let user = await User.findByIdAndUpdate(req.user._id, { $push: { photos: newImage } }, { new: true })
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
    let photos = await Photo.find({}).populate('addBy')
    res.status(200).json({ success: true, message: 'All images', data: photos })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const addSaved = async (req, res, next) => {
  try {
    let photo = await Photo.findById(req.body.imageId)
    if (!photo) {
      res.status(404)
      return next('Image not found')
    }
    if (!photo.saved.includes(req.body.userId)) {
      photo.saved.push(req.body.userId)
      await photo.save()
    }
    return res.status(200).json({ success: true, data: photo })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const imageDetail = async (req, res, next) => {
  try {
    const image = await Photo.findById(req.params.imageId).populate('addBy', '-password').populate('comments.addBy', '-password')

    if (!image) {
      res.status(404)
      return next('Image not found')
    }
    return res.status(200).json({ success: true, message: 'Found image info', image })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const addComment = async (req, res, next) => {
  try {
    req.body.addBy = req.user
    const image = await Photo.findByIdAndUpdate(req.params.imageId, { $push: { comments: req.body } }, { new: true })
    if (!image) {
      res.status(404)
      return next('Image not found')
    }
    return res.status(201).json({ success: true, message: 'Created new comment', image })
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

const photosByCategory = async (req, res, next) => {
  try {
    const {categoryId} = req.params
    console.log(categoryId)
    const images = await Photo.find({ category: categoryId })
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