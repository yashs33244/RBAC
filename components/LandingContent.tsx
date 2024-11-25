// LandingContent.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LandingContent() {
  const router = useRouter();

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
}
