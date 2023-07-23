import { Prisma } from '@prisma/client'

export const userWithoutPassword = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true },
})

export type UserWithoutPassword = Prisma.UserGetPayload<typeof userWithoutPassword>

export type UserWithoutPasswordWithJWT = {
  email: string;
  jwt: string;
}
