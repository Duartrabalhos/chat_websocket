import { RequestHandler } from 'express';
import { HttpErrorResponse } from '../utils/HttpErrorResponse';
import jwt from 'jsonwebtoken';

export const authHandler: RequestHandler = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(403).send({ message: 'Usuário não autorizado' });
    return;
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    response.status(403).send({ message: 'Token inválido' });
    return;
  }

  if (!process.env.SECRET_KEY) {
    throw new HttpErrorResponse(500, 'Erro interno: SECRET_KEY ausente', null);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    (request as any).user = decoded; // ESSA LINHA resolve o problema
    next();
  } catch (error: any) {
    throw new HttpErrorResponse(403, 'Token expirado ou inválido', null);
  }
};
