import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoURI = process.env.MONGO_URI
export const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS
export const NODE_ENV = process.env.NODE_ENV
