import mongoose from 'mongoose'
import { app } from './app'
import { mongoURI, port } from './app/config'
import { Server } from 'http'
let server: Server

async function main() {
  try {
    server = await app.listen(port, () => {
      console.log('Server is running on port ' + port)
    })
    await mongoose.connect(mongoURI as string)
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection', () => {
  console.log('🐞  Unhandled Rejection. Shutting down...')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

process.on('uncaughtException', () => {
  console.log('🐞  Uncaught Exception. Shutting down...')
  process.exit(1)
})
