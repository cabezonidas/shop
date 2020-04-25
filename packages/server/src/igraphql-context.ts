import { Request, Response } from "express";
import { I18NextRequest } from "i18next-express-middleware";

export interface IGraphqlContext {
  req: Request & I18NextRequest;
  res: Response;
  payload?: { userId: string };
}
