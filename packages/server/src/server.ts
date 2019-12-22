import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import { createConnection } from "typeorm";
import { mongodbConnection } from "../ormconfig";
import * as cookieParser from "cookie-parser";

createConnection(mongodbConnection)
  .then(() => console.log("Connected to DB"))
  .catch(error => console.log("Error: ", error));

const port = process.env.PORT;
const app = express();
app.get("/", (_, res) => res.send("Home route"));
const server = new ApolloServer({ typeDefs, resolvers });
app.use(cookieParser());
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`)
);
