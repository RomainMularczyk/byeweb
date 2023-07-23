import { Response, Request } from 'express'
import { UsersService } from '../services/users.service'

export class UsersController {
  static async getUser(req: Request, res: Response): void {
    try {
      const user = await UsersService.getUserByEmail(req.body.email)
      return res.status(200).json({
        status: 200,
        data: user,
      })
    } catch (err: any) {
      return res.status(404).json({
        status: 404,
        message: err.message,
      })
    }
  }

  static async loginUser(req: Request, res: Response): void {
    try {
      const user = await UsersService.getUserByEmailAndPassword(
        req.body.email,
        req.body.password
      )
      return res.status(200).json({
        status: 200,
        data: user
      })
    } catch (err) {
      return res.status(404).json({
        status: 404,
        message: err.message,
      })
    }
  }
}
