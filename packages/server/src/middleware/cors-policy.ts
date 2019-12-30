import * as cors from "cors";

const { CORS_ALLOWED_DOMAIN, NODE_ENV } = process.env;

const whiteList = [
  ...((CORS_ALLOWED_DOMAIN || "").split(",") || []),
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
