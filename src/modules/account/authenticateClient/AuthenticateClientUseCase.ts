import { prisma } from "../../../database/prismaClient"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ password, username }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, "f36d0c073ddbf7524b09c7ee25064708", {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}