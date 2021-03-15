import dotEnv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
import Debug from 'debug'
import { responseEnhancer } from 'express-response-formatter'
import router from './router'

dotEnv.config()

const app = express()
const port = process.env.PORT
const baseURL = process.env.BASE_URL

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(responseEnhancer())

const debug = Debug('app:server')

router(app)

app.listen(port, () => {
  debug(`Server is running on ${chalk.green(`${baseURL}:${port}`)}`)
})
