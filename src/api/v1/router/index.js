import AdminBroRouter, { adminBro } from './AdminBroRouter';
import { UserController } from '../controllers';
import { generateRouter } from '../utils';

const router = (app) => {
  app.use(adminBro.options.rootPath, AdminBroRouter)
  app.use(`${process.env.API_PATH}/users`, generateRouter(UserController))
}

export default router
