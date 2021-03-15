import { ValidationError } from 'sequelize'

const sendErrorResponse = (e, res) => {
  if (e instanceof ValidationError) {
    const errors = e.errors?.map((error) => ({
      detail: error.message,
      field: error.path,
      type: error.type,
    }))
    return res.formatter.badRequest(errors)
  }

  return res.formatter.serverError(e?.message ?? 'An error has occurred')
}

const sendNotFoundResponse = (res, name) =>
  res.formatter.notFound([{ detail: `${name} not found` }])

const availableCrudOptions = ['getAll', 'getById', 'create', 'update', 'delete']

const getCrudMethods = (name, model, crudOptions) => {
  const methods = {}

  if (crudOptions.includes('getAll')) {
    methods.getAll = async (req, res) => {
      try {
        const users = await model.findAll()
        return res.formatter.ok(users)
      } catch (error) {
        return sendErrorResponse(error, res)
      }
    }
  }

  if (crudOptions.includes('getById')) {
    methods.getById = async (req, res) => {
      try {
        const user = await model.findByPk(req.params.id)
        if (user) return res.formatter.ok(user)
        return sendNotFoundResponse(res, name)
      } catch (error) {
        return sendErrorResponse(error, res)
      }
    }
  }

  if (crudOptions.includes('create')) {
    methods.create = async (req, res) => {
      try {
        const newRecord = await model.create(req.body)
        return res.formatter.created(newRecord)
      } catch (error) {
        return sendErrorResponse(error, res)
      }
    }
  }

  if (crudOptions.includes('update')) {
    methods.update = async (req, res) => {
      try {
        const record = await model.findByPk(req.params.id)

        if (record) {
          const payload = req.body
          await model.update(payload, { where: { id: req.params.id } })
          Object.assign(record, payload)
          return res.formatter.ok(record)
        }

        return sendNotFoundResponse(res, name)
      } catch (error) {
        return sendErrorResponse(error, res)
      }
    }
  }

  if (crudOptions.includes('delete')) {
    methods.delete = async (req, res) => {
      try {
        const record = await model.findByPk(req.params.id)

        if (record) {
          record.destroy()
          res.formatter.ok(record)
        }

        return sendNotFoundResponse(res, name)
      } catch (e) {
        return res.formatter.serverError(e?.message ?? 'An error has occurred')
      }
    }
  }

  return methods
}

const generateController = {
  create: (name, model) => getCrudMethods(name, model, availableCrudOptions),
  omit: (name, model, methodsToOmit) => {
    const methodsToCreate = availableCrudOptions.filter(
      (val) => !methodsToOmit.includes(val)
    )
    return getCrudMethods(name, model, methodsToCreate)
  },
  only: (name, model, methodsToCreate) =>
    getCrudMethods(name, model, methodsToCreate),
}

export default generateController
