import { Router } from 'express'
import * as UserController from './controllers/user'
const router = new Router()

router.route('/getUsers').get(UserController.getUser)
router.route('/putUser').post(UserController.putUser)

export default router
