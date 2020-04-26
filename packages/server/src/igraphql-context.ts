import { Response } from "express";
import { I18NextRequest } from "i18next-express-middleware";

export interface IGraphqlContext {
  req: I18NextRequest;
  res: Response;
  payload?: { userId: string };
}
