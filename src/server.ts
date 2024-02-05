import mongoose from 'mongoose'
import { app } from './app'
import { mongoURI, port } from './app/config'
import { Server } from 'http'
import seedSuperAdmin from './app/db/seedb'
let server: Server

async function main() {
  try {
    await mongoose.connect(mongoURI as string)
    await seedSuperAdmin()
    server = await app.listen(port, () => {
      console.log('Server is running on port ' + port)
    })
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
