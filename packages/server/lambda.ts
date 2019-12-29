import * as awsServerlessExpress from "aws-serverless-express";
import app from "./src/server";
const binaryMimeTypes = [
  "application/octet-stream",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

export const backend = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context);
};

export const hello = (event: any, context: any, callback: any) => {
  console.log("Hello Cabe");
  callback(null, "Hello Cabe");
};
