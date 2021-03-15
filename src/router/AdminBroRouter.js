import AdminBro from 'admin-bro'
import AdminBroExpress from '@admin-bro/express'
import AdminBroSequelize from '@admin-bro/sequelize'
import db from '../models'

AdminBro.registerAdapter(AdminBroSequelize)

const userProperties = ['id', 'firstName', 'lastName', 'email']
const commonProperties = ['createdAt', 'updatedAt']

const accountNavigation = {
  name: 'General',
  icon: 'Account',
}

export const adminBro = new AdminBro({
  // databases: [db],
  resources: [
    {
      resource: db.User,
      options: {
        listProperties: [...userProperties, ...commonProperties],
        editProperties: userProperties.filter((property) => property !== 'id'),
        filterProperties: [...userProperties, ...commonProperties],
        navigation: accountNavigation,
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: process.env.API_NAME,
  },
})

const router = AdminBroExpress.buildRouter(adminBro)

export default router
