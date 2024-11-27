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

const formSchema = z
  .object({
    firstName: z
      .string({ message: en.firstName.string })
      .min(account.FIRST_NAME_MIN, { message: en.firstName.min })
      .max(account.FIRST_NAME_MAX, { message: en.firstName.max })
      .regex(/[a-zA-Z]/, { message: en.firstName.regex }),
    lastName: z
      .string({ message: en.lastName.string })
      .min(account.LAST_NAME_MIN, { message: en.lastName.min })
      .max(account.LAST_NAME_MAX, { message: en.lastName.max })
      .regex(/[a-zA-Z]/, { message: en.lastName.regex }),
    email: z
      .string({ message: en.email.string })
      .min(account.EMAIL_MIN, { message: en.email.min })
      .max(account.EMAIL_MAX, { message: en.email.max })
      .email({ message: en.email.email }),
    password: z
      .string({ message: en.password.string })
      .min(account.PASSWORD_MIN, { message: en.password.min })
      .max(account.PASSWORD_MAX, { message: en.password.max })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: en.password.regex,
      }),
    passwordConfirmation: z.string({ message: en.passwordConfirmation.string }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: en.passwordConfirmation.match,
    path: ["passwordConfirmation"],
  });

export default function SignInForm() {
  const { signUp, error, errorAnimation } = useAccountContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const user = await signUp(values);
    if (user) {
      navigate(url.home);
    }
  }

  return (
    <section className="flex flex-col items-center gap-8 h-fit rounded-xl border p-10 shadow">
      <article>
        <h2 className="mb-3">Create your account</h2>
        <h3 className="text-xl mb-1">
          Already have an account?{" "}
          <Link className="font-extrabold" to={url.account + url.signIn}>
            Sign in
          </Link>
        </h3>
        <p className="mb-6">
          Join on us and get access to exclusive offers and benefits!
        </p>
        {error.length > 0 && (
          <div className="mb-3">
            {(() => {
              window.scrollTo(0, 0);
              return null;
            })()}
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sarah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Thomas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Password confirmation
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    Enter your password once again
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign up</Button>
          </form>
        </Form>
      </article>
    </section>
  );
}
