import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyAuth = async (token: string, JWT: string) => {
  return (await jwt.verify(token, JWT)) as JwtPayload
}
