import { Router } from "express"
import * as authCtrl from "../controllers/auth.js"

const router = Router()

router.post('/register', authCtrl.register)
router.post('/google-oauth', authCtrl.OAth)

export {router}