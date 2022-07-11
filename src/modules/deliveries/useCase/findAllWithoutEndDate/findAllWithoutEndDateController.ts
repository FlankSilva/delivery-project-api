import { Request, Response } from "express";
import { FindAllWithoutEndDateUseCase } from "./findAllWithoutEndDateUseCase";

export class FindAllWithoutEndDateController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndDateUseCase = new FindAllWithoutEndDateUseCase()

    const deliveries = await findAllWithoutEndDateUseCase.execute()

    return response.json(deliveries)
  }
}
