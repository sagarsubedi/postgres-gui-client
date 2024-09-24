import { createCookieSessionStorage } from "@remix-run/node";
import { makeLogtoRemix } from "@logto/remix";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "logto-session",
    maxAge: 14 * 24 * 60 * 60,
    secrets: [process.env.SESSION_SECRET!],
  },
});

export const logto = makeLogtoRemix(
  {
    endpoint: process.env.LOGTO_ENDPOINT!,
    appId: process.env.LOGTO_APP_ID!,
    appSecret: process.env.LOGTO_APP_SECRET!,
    baseUrl: process.env.LOGTO_BASE_URL!,
  },
  { sessionStorage }
);
