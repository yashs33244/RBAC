"use client";

import { AuthTabs } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <AuthTabs />
      </div>
    </div>
  );
}
