import { createServer, proxy } from "aws-serverless-express";
import app from "./src/server";
import { connectToDatabase } from "./src/db";
import { Context } from "aws-lambda";

const binaryMimeTypes = [
  "application/octet-stream",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const server = createServer(app, null, binaryMimeTypes);

export const backend = async (event: any, context: Context) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return proxy(server, event, context, "PROMISE").promise;
};
