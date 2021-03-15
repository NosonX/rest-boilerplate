import { Router } from 'express'

const generateRouter = (controller) => {
  const router = Router()

  if (controller.getAll) router.get('/', controller.getAll)
  if (controller.create) router.post('/', controller.create)
  if (controller.getById) router.get('/:id', controller.getById)
  if (controller.update) router.put('/:id', controller.update)
  if (controller.delete) router.delete('/:id', controller.delete)

  return router
}

export default generateRouter
