import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export const authOptions: NextAuthOptions = {
    //@ts-ignore
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt", // Using JWT for sessions
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        // Find existing user
        let user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // Create user if not found
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.email.split("@")[0], // Use the part before '@' as the default name
              role: "USER", // Default role
            },
          });
        } else {
          // Verify password for existing user
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions ?? [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect users to the dashboard after sign-in
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    signOut: "/auth/signin", // Redirect here after sign-out
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
