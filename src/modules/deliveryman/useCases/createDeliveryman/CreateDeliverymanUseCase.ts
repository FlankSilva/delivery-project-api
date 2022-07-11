import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IcreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute ({ password, username }: IcreateDeliveryman) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (deliverymanExist) {
      throw new Error("Deliveryman already exists")
    }

    const hashPassword = await hash(password, 10)

    const deliveryman =  await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return deliveryman
  }
}