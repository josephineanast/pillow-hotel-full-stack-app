import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user";
import { NextRequest } from "next/server";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

type Credentials = {
  email: string;
  password: string;
};

type Token = {
  user: IUser;
};

async function auth(req: NextRequest, res: any) {
  return await nextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
          },
        },
      }),
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();
          const { email, password } = credentials;
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error("Invalid email or password");
          }

          return user;
        },
      }),
    ],

    callbacks: {
      jwt: async ({ token, user }) => {
        const jwtToken = token as Token;
        user && (token.user = user);

        // update session when user is updated
        if (req.url?.includes("/api/auth/session?update")) {
          // hit the database and return the updated user
          const updatedUser = await User.findById(jwtToken?.user?._id);
          token.user = updatedUser;
        }

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        // @ts-ignore
        delete session?.user?.password;

        return session;
      },
      redirect: async ({ baseUrl }) => {
        return baseUrl;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
