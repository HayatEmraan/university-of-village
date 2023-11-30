import mongoose from 'mongoose'
import { app } from './app'
import { mongoURI, port } from './app/config'

async function main() {
  try {
    await app.listen(port, () => {
      console.log('Server is running on port ' + port)
    })
    await mongoose.connect(mongoURI as string)
  } catch (error) {
    console.log(error)
  }
}

main()
