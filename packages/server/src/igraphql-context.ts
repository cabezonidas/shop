import { Request, Response } from "express";

export interface IGraphqlContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
