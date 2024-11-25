"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Landing = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show nothing during SSR
  if (!isMounted) {
    return null;
  }

  // Show loader only after component is mounted and while checking auth
  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Prevent rendering content if authenticated
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-center">Welcome</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/auth/signin")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/auth/signin")}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
