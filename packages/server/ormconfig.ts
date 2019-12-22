import { ConnectionOptions } from "typeorm";

export const ormconfig: ConnectionOptions = {
  type: "mongodb",
  url:
    "mongodb+srv://cabezonidas:TestPassword1407@repocluster-exdit.mongodb.net/test?retryWrites=true&w=majority",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.js"],
  subscribers: ["src/subscriber/*.js"],
  migrations: ["src/migration/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default ormconfig;
