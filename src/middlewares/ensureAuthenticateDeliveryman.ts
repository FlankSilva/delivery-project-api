import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
  sub: string
}

export const ensureAuthenticateDeliveryman = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({
      message: "Token missing"
    })
  }

  const [_, token] = authHeader?.split(' ')!

  try {
    const { sub } = verify(token, 'f36d0c073ddbf777524b09c7ee25064708') as IPayload    

    request.id_deliveryman = sub
    
    return next()
  } catch (error) {
    response.status(401).json({
      message: "Invalid token!"
    }) 
  }
} 