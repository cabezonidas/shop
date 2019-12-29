import "dotenv/config";
import "reflect-metadata";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { mongodbConnection } from "../ormconfig";
import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "./resolvers/user-resolver";
import { router } from "./router";
import { corsPolicy, translation } from "./middleware";
import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(translation);
app.use(corsPolicy);
app.use(cookieParser());
app.use("/", router);

const server = new ApolloServer({
  schema: buildSchemaSync({ resolvers: [UserResolver] }),
  context: ({ req, res }) => ({ req, res }),
});
server.applyMiddleware({ app, cors: false });

if (process.env.NODE_ENV === "development") {
  createConnection(mongodbConnection);
  const port = process.env.PORT;
  app.listen({ port }, () =>
    console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

export default app;
