"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

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
import { Input } from "@/components/ui/input";
import { url } from "@/router";
import { account } from "@/lib/schemas/account";
import { en } from "@/lib/languages/en";

const formSchema = z
  .object({
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

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    navigate(url.home);
    console.log(values);
  }

  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 h-fit rounded-xl border p-10 shadow">
      <article>
        <h2 className="mb-3">Enter your new password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your password once again
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Reset password</Button>
          </form>
        </Form>
      </article>
    </section>
  );
}
