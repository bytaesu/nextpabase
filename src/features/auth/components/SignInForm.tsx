"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { AUTH_ROUTES } from "@/shared/lib/supabase/auth/auth.config";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import PasswordInput from "./PasswordInput";
import { signInFormSchema } from "../lib/validations";
import { signInAction } from "../actions/sign-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import React, { useState } from "react";

/**
 * SignInForm Component
 * A form component that allows users to sign in by providing an email and password.
 * Includes validation, form submission, and error handling.
 */
const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission.
   * - Attempts to sign the user in with provided credentials.
   * - Redirects to the private home on success or displays an error message on failure.
   */
  const onSubmit = async (formData: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);

    const { error } = await signInAction(formData.email, formData.password);
    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    router.replace(AUTH_ROUTES.Private.PrivateHome);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={AUTH_ROUTES.Public.ForgotPassword}>
                    <p className="text-sm text-blue-500 font-medium">
                      Forgot password?
                    </p>
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <PasswordInput id="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-6">
          <Button
            variant={"blue"}
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
