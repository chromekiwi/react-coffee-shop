"use client";

import clsx from "clsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { url } from "@/router";
import { account } from "@/lib/schemas/account";
import { en } from "@/lib/languages/en";
import { useAccountContext } from "@/hooks/useAccount";

const formSchema = z.object({
  email: z
    .string({ required_error: en.email.string })
    .min(1, { message: en.email.string })
    .max(account.EMAIL_MAX, { message: en.email.max })
    .email({ message: en.email.email }),
  password: z
    .string({ required_error: en.password.string })
    .min(1, { message: en.password.string })
    .max(account.PASSWORD_MAX, { message: en.password.max }),
});

export default function SignInForm() {
  const { signIn, error, errorAnimation } = useAccountContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const user = await signIn(values);
    if (user) {
      navigate(url.home);
    }
  }

  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 h-fit rounded-xl border p-10 shadow">
      <article>
        <h2 className="mb-3">Sign in or create an account</h2>
        {error.length > 0 && (
          <div className="mb-3">
            <Alert
              variant="destructive"
              className={clsx("alert", { "fade-out": errorAnimation })}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.map((error, index) => (
                  <span key={index}>
                    {error}
                    {index < error.length - 1 && <br />}
                  </span>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    Enter your password to sign in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="underline">
              <Link to={url.account + url.forgotPassword}>
                Forgot your password?
              </Link>
            </div>
            <Button type="submit">Sign in</Button>
          </form>
        </Form>
        <h3 className="text-xl mt-6">
          Don't have an account?{" "}
          <Link className="font-extrabold" to={url.account + url.signUp}>
            Sign up
          </Link>
        </h3>
        <p>Join on us and get access to exclusive offers and benefits!</p>
      </article>
    </section>
  );
}
