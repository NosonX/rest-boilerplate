import dotEnv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
import router from './api/v1/router'
import bodyParser from 'body-parser'
import { responseEnhancer } from 'express-response-formatter'

dotEnv.config()

const app = express()
const port = process.env.PORT

app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(responseEnhancer())

router(app)

app.listen(port, () => {
    console.log(`Server is running on PORT ${chalk.green(port)}`);
})
