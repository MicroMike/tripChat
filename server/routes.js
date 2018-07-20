import { Router } from 'express'
import * as UserController from './controllers/user'
const router = new Router()

router.route('/login/:email/:password').get(UserController.login)
router.route('/putUser').post(UserController.putUser)

export default router
