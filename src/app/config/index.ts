import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoURI = process.env.MONGO_URI
export const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS
export const NODE_ENV = process.env.NODE_ENV
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
