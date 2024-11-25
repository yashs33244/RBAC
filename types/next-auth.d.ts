import { DefaultSession, DefaultUser } from "next-auth"
import { Role, Permission } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      permissions: Permission[];
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: Role;
    permissions: Permission[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    permissions: Permission[];
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends DefaultUser {
    role: Role;
    permissions: Permission[];
  }
}