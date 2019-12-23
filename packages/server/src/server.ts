import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection, getMongoRepository, ObjectID } from "typeorm";
import { mongodbConnection } from "../ormconfig";
import * as cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user-resolver";
import { verify } from "jsonwebtoken";
import { User } from "./entity/user";
import { createAccessToken } from "./auth/tokens";
import { ObjectId } from "mongodb";

(async () => {
  await createConnection(mongodbConnection);

  const port = process.env.PORT;
  const app = express();
  app.use(cookieParser());

  app.get("/", (_, res) => res.send("Home route"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ _id: new ObjectId(payload.userId) });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})();
