import * as cors from "cors";

const { CORS_ALLOWED_DOMAINS, NODE_ENV } = process.env;

export const whiteList = [
  ...((CORS_ALLOWED_DOMAINS || "").split(",") || []),
  ...(NODE_ENV === "development" || NODE_ENV === "testing" ? [undefined] : []),
];

export const corsPolicy = cors({
  origin: (origin, callback) => {
    if (whiteList.indexOf[origin] !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed`));
    }
  },
  credentials: true,
});
