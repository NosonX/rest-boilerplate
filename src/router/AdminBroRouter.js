import AdminBro from 'admin-bro'
import AdminBroExpress from '@admin-bro/express'
import AdminBroSequelize from '@admin-bro/sequelize'
import db from '../models'

AdminBro.registerAdapter(AdminBroSequelize)

export const adminBro = new AdminBro({
  // databases: [db],
  resources: [{ resource: db.User }],
  rootPath: '/admin',
  branding: {
    companyName: process.env.API_NAME,
  },
})

const router = AdminBroExpress.buildRouter(adminBro)

export default router
