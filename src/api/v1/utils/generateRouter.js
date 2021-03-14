import {Router} from 'express'

const generateRouter = (controller) => {
    const router = Router()

    if (controller.hasOwnProperty('getAll')) router.get('/', controller.getAll)
    if (controller.hasOwnProperty('create')) router.post('/', controller.create)
    if (controller.hasOwnProperty('getById')) router.get('/:id', controller.getById)
    if (controller.hasOwnProperty('update')) router.patch('/:id', controller.update)
    if (controller.hasOwnProperty('delete')) router.delete('/:id', controller.delete)

    return router
}

export default generateRouter
