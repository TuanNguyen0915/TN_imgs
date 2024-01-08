import {Router} from 'express'
import * as imageCtrl from '../controllers/photo.js'

const router = Router()

router.post('/:userId/upload-image', imageCtrl.uploadImage )
router.get('/all', imageCtrl.allImages)
router.post('/saved', imageCtrl.addSaved)
export {router}