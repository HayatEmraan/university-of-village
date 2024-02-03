import express, { Application } from 'express'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import router from './app/routes/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
export const app: Application = express()
import morgan from 'morgan'

// body parser middleware
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.get('/', (req, res) => {
  return res.status(200).send({
    success: true,
    message: 'Welcome to University of Village API',
  })
})

app.get('*', (req, res) => {
  return res.status(404).send({
    success: false,
    message: 'Route not found',
  })
})

app.use(globalErrorHandler)


