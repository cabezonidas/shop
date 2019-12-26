import * as cors from "cors";

const whiteList = [
  ...((process.env.CORS_ALLOWED_DOMAIN || "").split(",") || []),
  ...(process.env.NODE_ENV === "development" ? [undefined] : []),
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
