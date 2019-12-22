import { ConnectionOptions } from "typeorm";

const { MONGODB_USR, MONGODB_PASSWORD } = process.env;

export const mongodbConnection: ConnectionOptions = {
  type: "mongodb",
  url: `mongodb+srv://${MONGODB_USR}:${MONGODB_PASSWORD}@repocluster-exdit.mongodb.net/test?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  migrations: ["src/migration/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
