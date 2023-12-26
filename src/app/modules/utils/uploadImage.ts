import { v2 as cloudinary } from 'cloudinary'
import {
  CLOUDINARY_API,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET,
} from '../../config'
import multer from 'multer'
import fs from 'fs'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
})

export const uploadImage = async (name: string, file: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { public_id: name },
      function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result)
        fs.unlink(file, err => {
          if (err) throw err
          console.log('file deleted')
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
