import { withIronSessionApiRoute } from "iron-session/next";

const sessionOption = {
  cookieName: "PIMSESSION",
  password: "760848aa-c385-4321-ba49-75201fa0de81",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 60 * 60 * 24,
  },
};

export default function withSession(route) {
  return withIronSessionApiRoute(route, sessionOption);
}
