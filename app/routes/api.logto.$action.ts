import { logto } from "../../service/auth.server";

export const loader = logto.handleAuthRoutes({
  "sign-in": {
    path: "/api/logto/sign-in",
    redirectBackTo: "/api/logto/callback",
  },
  "sign-in-callback": {
    path: "/api/logto/callback",
    redirectBackTo: "/gui",
  },
  "sign-out": {
    path: "/api/logto/sign-out",
    redirectBackTo: "/",
  },
  "sign-up": {
    path: "/api/logto/sign-up",
    redirectBackTo: "/api/logto/callback",
  },
});
