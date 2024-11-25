import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, LogOut, Mail } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  name: z.string().optional(),
});

export function AuthForm({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (mode === "signup") {
        // Handle signup
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Sign in after successful signup
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/dashboard",
          });
        } else {
          throw new Error("Signup failed");
        }
      } else {
        // Handle signin
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === "signup" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <span className="animate-spin">⌛</span>
              <span>Loading...</span>
            </div>
          ) : (
            <span>{mode === "signup" ? "Sign Up" : "Sign In"}</span>
          )}
        </Button>
      </form>
    </Form>
  );
}

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<string>("signin");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          {activeTab === "signin"
            ? "Sign in to your account to continue"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <div className="space-y-4">
              <AuthForm mode="signin" />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  onClick={() => signIn("google")}
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" /> Google
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <AuthForm mode="signup" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium">{session.user?.name}</p>
        <p className="text-muted-foreground">{session.user?.email}</p>
      </div>
      <Button variant="outline" onClick={() => signOut()} size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
