import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { mongodbConnection } from "../ormconfig";
import * as cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user-resolver";

(async () => {
  await createConnection(mongodbConnection);

  const port = process.env.PORT;
  const app = express();
  app.get("/", (_, res) => res.send("Home route"));
  const server = new ApolloServer({ schema: await buildSchema({ resolvers: [UserResolver] }) });
  app.use(cookieParser());
  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})();
