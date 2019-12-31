import { Router, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/user";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "../auth/tokens";
import { ObjectId } from "mongodb";

const sendUnauthenticated = (res: Response, error: string) => res.send({ ok: false, error });
export const router = Router();

router.route("/").get((_, res) => res.send("Home route"));
router.route("/refresh_token").post(async (req, res) => {
  const token = req.cookies.jid;

  if (!token) {
    return sendUnauthenticated(res, `no token`);
  }
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return sendUnauthenticated(res, `not verified ${token}`);
  }

  const user = await User.findOne({ _id: new ObjectId(payload.userId) });

  if (!user) {
    return sendUnauthenticated(res, `no user ${payload.userId}`);
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return sendUnauthenticated(
      res,
      `different token versions ${user.tokenVersion} ${payload.tokenVersion}`
    );
  }

  sendRefreshToken(res, createRefreshToken(user));
  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

export default router;
