// app/api/auth/[...nextauth]/route.ts

import { authOptions } from "@/auth/auth-config";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// Export named functions for GET and POST methods
export const GET = handler;
export const POST = handler;