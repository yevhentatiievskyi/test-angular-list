import {Request, Response} from "express";

export const handlerAPI = (fn: (req: Request) => any) => {
  return async (request: Request, response: Response) => {
    try {
      response.json(await fn(request));
    }catch (e) {
      response.status(e.status || 500).json({ message: e.message || 'Internal server error'});
    }
  }
}
