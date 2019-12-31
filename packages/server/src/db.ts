import { mongodbConnection } from "../ormconfig";
import { createConnection } from "typeorm";
import mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected: boolean;

export const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return createConnection(mongodbConnection).then(db => {
    isConnected = db.isConnected;
  });
};
