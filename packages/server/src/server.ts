import "dotenv/config";
import "reflect-metadata";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { mongodbConnection } from "../ormconfig";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user-resolver";
import { router } from "./router";
import { corsPolicy, translation } from "./middleware";

(async () => {
  await createConnection(mongodbConnection);

  const port = process.env.PORT;
  const app = express();

  app.use(translation);
  app.use(corsPolicy);
  app.use(cookieParser());
  app.use("/", router);

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app, cors: false });

  app.listen({ port }, () =>
    console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})();
