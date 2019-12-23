import { User } from "../entity/user";
import { sign } from "jsonwebtoken";

export const createRefreshToken = (user: User) =>
  sign({ userId: user.id }, process.env.REFRESH_KEY, { expiresIn: "7d" });

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_KEY, { expiresIn: "15min" });
