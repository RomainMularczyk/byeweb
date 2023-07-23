import dotenv from 'dotenv'
import { Response, Request, RequestHandler } from 'express'
import { decodeJwt, jwtVerify } from 'jose'
import JWTError from '../errors/jwt.error'
import type { JWTUserPayload } from '../types/JWT'
import { UsersService } from '../services/users.service'

dotenv.config()

export class UsersMiddleware {
  static async isUserAuthenticated(
    req: Request,
    res: Response,
    next: RequestHandler
  ): void {
    const authHeader = req.headers['authorization']

    if (authHeader === undefined) {
      res.status(401).json({
        status: 401,
        message: 'Access denied. Please provide a valid Bearer token.',
      })
    }

    try {
      const parsedJwt = authHeader.replace('Bearer ', '')
      const jwt = await UsersMiddleware.verifyAndDecodeJwt(parsedJwt)
      if (UsersMiddleware.userIsRegistered(jwt.email)) {
        next()
      }
    } catch (err) {
      res.status(403).json({
        status: 403,
        message: 'Wrong header format.',
      })
    }
  }

  /**
   * Verify and decode a JWT.
   *
   * @param {string} jwt - A JWT.
   * @returns {JWTUserPayload} The JWT user payload.
   */
  static async verifyAndDecodeJwt(jwt: string): Promise<JWTUserPayload> {
    const secret = new TextEncoder().encode(process.env.SECRET)
    const { payload, protectedHeader } = await jwtVerify(jwt, secret)
    return payload
  }

  /**
   * Verify that a user is registered in the database.
   * 
   * @param {string} email - User's email.
   * @returns {boolean} True if the user is registered.
  */
  static async userIsRegistered(email: string): Promise<boolean> {
    if (UsersService.getUserByEmail(email)) {
      return true
    } else {
      return false
    }
  }
}
