import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LogIn, LogOut } from "lucide-react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{session.user?.name}</p>
          <p className="text-muted-foreground">{session.user?.role}</p>
        </div>
        <Button variant="outline" onClick={() => signOut()} className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn("google")} className="gap-2">
      <LogIn className="h-4 w-4" />
      Sign In with Google
    </Button>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>
          {session
            ? "You are currently signed in"
            : "Please sign in to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session && (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {session.user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {session.user?.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {session.user?.role}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <AuthButton />
      </CardFooter>
    </Card>
  );
};

export default AuthStatus;
