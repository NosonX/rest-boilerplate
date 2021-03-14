import db from '../models'
import { generateController } from '../utils'

const controller = generateController.create('User', db.User)

export default controller
