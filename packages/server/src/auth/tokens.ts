import { User } from "../entity/user";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createRefreshToken = (user: User) =>
  sign({ userId: user._id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

export const createAccessToken = (user: User) =>
  sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" });

export const sendRefreshToken = (res: Response, token: string) => {
  const { NODE_ENV } = process.env;
  const path = `${NODE_ENV !== "development" ? `/${NODE_ENV}` : ""}/refresh_token`;
  return res.cookie("jid", token, { httpOnly: true, path, sameSite: "none", secure: true });
};
