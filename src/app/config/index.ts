import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoURI = process.env.MONGO_URI
export const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS
export const NODE_ENV = process.env.NODE_ENV
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
export const JWT_RESET_TOKEN = process.env.JWT_RESET_TOKEN
export const NODE_MAILER_SENDER = process.env.NODE_MAILER_SENDER
export const NODE_MAILER_PASS = process.env.NODE_MAILER_PASS
export const RESET_UI_LINK = process.env.RESET_UI_LINK
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET
export const CLOUDINARY_API = process.env.CLOUDINARY_API
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
