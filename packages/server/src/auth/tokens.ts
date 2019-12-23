import { User } from "../entity/user";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createRefreshToken = (user: User) =>
  sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

export const createAccessToken = (user: User) =>
  sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" });

export const sendRefreshToken = (res: Response, token: string) =>
  res.cookie("jid", token, { httpOnly: true });
