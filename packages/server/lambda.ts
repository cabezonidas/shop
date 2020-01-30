import { createServer, proxy } from "aws-serverless-express";
import app from "./src/server";
import { connectToDatabase } from "./src/db";
import { Context } from "aws-lambda";
import * as middy from "middy";
import { httpErrorHandler, cors } from "middy/middlewares";

const binaryMimeTypes = [
  "application/octet-stream",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const origin = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return "http://localhost:3000";
    default:
      return "https://tender-visvesvaraya-c78d68.netlify.com";
  }
})();

const server = createServer(app, null, binaryMimeTypes);

export const backend = middy(async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return proxy(server, event, context, "PROMISE").promise;
})
  .use(httpErrorHandler())
  .use(
    cors({
      origin,
      credentials: true,
      headers:
        "Access-Control-Request-Method, Access-Control-Request-Headers, Origin, Content-Type, authorization",
    })
  );
