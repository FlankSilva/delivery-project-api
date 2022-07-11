import { prisma } from "../../../database/prismaClient"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ password, username }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, "f36d0c073ddbf777524b09c7ee25064708", {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}