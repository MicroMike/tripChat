import { Router } from 'express'
import * as UserController from './controllers/user'
const router = new Router()

router.route('/getUsers').put(UserController.getUser)
router.route('/putUser').put(UserController.putUser)

export default router
