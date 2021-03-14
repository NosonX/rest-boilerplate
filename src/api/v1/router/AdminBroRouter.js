import AdminBro from 'admin-bro'
import AdminBroExpress from '@admin-bro/express'
import AdminBroSequelize from '@admin-bro/sequelize'
import db from '../models'

AdminBro.registerAdapter(AdminBroSequelize)

export const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

export default router
