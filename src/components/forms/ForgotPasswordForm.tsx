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

const formSchema = z.object({
  email: z
    .string({ message: en.email.string })
    .min(account.EMAIL_MIN, { message: en.email.min })
    .max(account.EMAIL_MAX, { message: en.email.max })
    .email({ message: en.email.email }),
});

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    navigate(url.account + url.resetPassword);
    console.log(values);
  }

  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 h-fit rounded-xl border p-10 shadow">
      <article>
        <h2 className="mb-3">Recover your password with your email</h2>
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
                  <FormDescription>
                    Enter the email address associated with your account
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
