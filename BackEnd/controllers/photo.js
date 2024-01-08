import Photo from '../models/photo.js'
import User from '../models/user.js'

const uploadImage = async (req, res, next) => {
  try {
    let newImage = await Photo.create(req.body)
    let user = await User.findByIdAndUpdate(req.params.userId, { $push: { photos: newImage } }, { new: true })
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
    let photos = await Photo.find({})
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
    if(!photo.saved.includes(req.body.userId)){
      photo.saved.push(req.body.userId)
      await photo.save()
    }
    return res.status(200).json({success: true, data:photo})
  } catch (error) {
    res.status(500)
    return next(error.message)
  }
}

export { uploadImage, allImages, addSaved }