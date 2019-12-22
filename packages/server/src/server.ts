import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import { createConnection } from "typeorm";
import { mongodbConnection } from "../ormconfig";

const expressPort = 8899;
express().listen(expressPort, () => {
  console.log(`Express server ready at http://localhost:${expressPort}/`);
});

new ApolloServer({ typeDefs, resolvers }).listen().then(({ url }) => {
  console.log(`Graphql server ready at ${url}`);
});

const uri: string =
  "mongodb+srv://cabezonidas:TestPassword1407@repocluster-exdit.mongodb.net/test?retryWrites=true&w=majority";

connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("DB Successfully connected");
    }
  }
);

createConnection(mongodbConnection)
  .then(async connection => {
    console.log("Connected to DB via typeORM!");
  })
  .catch(error => console.log("Error: ", error));
