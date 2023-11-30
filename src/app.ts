import express, { Application } from 'express'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import router from './app/routes/routes'
export const app: Application = express()

// body parser middleware
app.use(express.json())
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
