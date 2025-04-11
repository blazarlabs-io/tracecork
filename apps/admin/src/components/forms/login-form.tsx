"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "@/data/form-schemas";
import { EmailInputField } from "./fields/email-input-field";
import { PasswordInputField } from "./fields/password-input-field";
import { Button } from "@repo/ui/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const LoginForm = () => {
  // * HOOKS
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email:
        (typeof window !== "undefined" &&
          window.localStorage.getItem("email")) ||
        "",
      password:
        (typeof window !== "undefined" &&
          window.localStorage.getItem("password")) ||
        "",
    },
  });

  // * HANDLERS
  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    signInWithEmailAndPassword(auth, data.email, data.password).then((res) => {
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("password", data.password);
    });
  };

  return (
    <div className="flex flex-col gap-4 border rounded-lg p-8">
      <h2 className="text-3xl font-bold">Login to Tracecork Admin</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <EmailInputField
            name="email"
            placeholder="Email"
            formControl={form.control}
          />
          <PasswordInputField
            name="password"
            placeholder="Password"
            formControl={form.control}
          />
          <Button type="submit" size="lg" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
