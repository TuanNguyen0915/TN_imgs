import {Router} from 'express'
import * as imageCtrl from '../controllers/image.js'
import { decodeUserFromToken } from '../middleware/Auth.js'

const router = Router()

router.post('/upload-image',decodeUserFromToken, imageCtrl.uploadImage )
router.get('/category/:categoryId', imageCtrl.photosByCategory)
router.get('/all', imageCtrl.allImages)
router.get('/:imageId', imageCtrl.imageDetail)
router.post('/saved', imageCtrl.addSaved)
// comments
router.put('/:imageId/comments', decodeUserFromToken, imageCtrl.addComment)
//category
export {router}