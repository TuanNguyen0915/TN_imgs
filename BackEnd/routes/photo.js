import {Router} from 'express'
import * as imageCtrl from '../controllers/photo.js'
import { decodeUserFromToken } from '../middleware/Auth.js'

const router = Router()

router.post('/upload-image',decodeUserFromToken, imageCtrl.uploadImage )
router.get('/all', imageCtrl.allImages)
router.get('/:imageId', imageCtrl.imageDetail)
router.post('/saved', imageCtrl.addSaved)
export {router}