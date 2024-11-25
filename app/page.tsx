"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this component only runs on the client
  useEffect(() => {
    setIsMounted(true);

    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (!isMounted || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    // Prevent rendering further content if the user is authenticated.
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome</h1>
      <div className="flex gap-4">
        <a
          href="/auth/signin"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign In
        </a>
        <a
          href="/auth/signin"
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Sign Up
        </a>
      </div>
    </main>
  );
}
