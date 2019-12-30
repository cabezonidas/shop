import { createServer, proxy } from "aws-serverless-express";
import app from "./src/server";
import { connectToDatabase } from "./src/db";
import { Context } from "aws-lambda";
import * as middy from "middy";
import { httpErrorHandler, cors } from "middy/middlewares";
import { whiteList } from "./src/middleware";

const binaryMimeTypes = [
  "application/json",
  "application/octet-stream",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const server = createServer(app, null, binaryMimeTypes);

export const backend = middy(async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return proxy(server, event, context, "PROMISE").promise;
})
  .use(httpErrorHandler())
  .use(cors({ origins: whiteList, credentials: true }));
