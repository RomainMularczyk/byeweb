import dotenv from 'dotenv'
import argon2 from 'argon2'
import { Prisma } from '@prisma/client'
import { SignJWT } from 'jose'
import prisma from '../database'
import DatabaseError from '../errors/database.error'
import AuthError from '../errors/auth.error'
import type {
  UserWithoutPassword,
  UserWithoutPasswordWithJWT,
} from '../types/User.d.ts'

dotenv.config()

export class UsersService {
  /**
   * Retrieve a given user in the database searching its email.
   *
   * @async
   * @param {string} email - User's email.
   * @throws {DatabaseError} If the database could not respond.
   * @returns {UserWithoutPassword} A given user.
   */
  static async getUserByEmail(email: string): Promise<UserWithoutPassword> {
    try {
      const dbResponse = await prisma.user.findUnique({
        where: { email: email },
        select: {
          email: true,
        },
      })
      if (dbResponse) {
        return dbResponse
      } else {
        throw new DatabaseError('No matching user found in the database.')
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError()
      }
      throw err
    }
  }

  /**
   * Retrieve a given user in the database searching its email
   * and checking its password.
   *
   * @async
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @throws {AuthError} If the password is incorrect.
   * @throws {DatabaseError} If the database could not respond.
   * returns {UserWithoutPasswordWithJWT} A given user and a granted JWT.
   */
  static async getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserWithoutPasswordWithJWT> {
    const dbResponse = await prisma.user.findUnique({
      where: { email: email },
    })

    if (dbResponse) {
      if (await argon2.verify(dbResponse.password, password)) {
        const jwt = await UsersService.generateToken({
          email: dbResponse.email,
        })
        return {
          email: dbResponse.email,
          jwt: jwt,
        }
      } else {
        throw new AuthError('Incorrect password.')
      }
    }
    throw new DatabaseError()
  }

  /**
   * Generate a JWT for an authorized user.
   *
   * @async
   * @param {UserWithoutPassword} - User metadata wihtout password.
   * @returns {string} A signed JWT.
   */
  static async generateToken(user: UserWithoutPassword): Promise<string> {
    const secret = new TextEncoder().encode(process.env.SECRET)
    const userEncoded = new TextEncoder().encode(JSON.stringify(user))

    const jwt = await new SignJWT(user)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('urn:byeweb:issuer')
      .setSubject('urn:byeweb:authentication')
      .setAudience('urn:byeweb:audience')
      .setExpirationTime('2h')
      .sign(secret)

    return jwt
  }
}
