"use client";

import {
  AUTH_ROUTES,
  PRESET_AUTH_ERRORS,
} from "@/shared/lib/supabase/auth/auth.config";
import { toast } from "sonner";
import { Button, ButtonProps } from "@/shared/components/ui/button";
import { signOutAction } from "../actions/sign-out";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SignOutButtonProps = Pick<
  ButtonProps,
  "size" | "variant" | "disabled" | "children" | "className"
>;

/**
 * SignOutButton Component
 * A customizable button for handling user sign-out.
 * Includes loading state and error handling for improved UX.
 */
const SignOutButton = ({
  size,
  variant,
  disabled,
  children,
  className,
}: SignOutButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await signOutAction();

    if (error) {
      setIsLoading(false);
      toast.error(PRESET_AUTH_ERRORS.SignOutError);
      return;
    }

    router.replace(AUTH_ROUTES.Public.SignIn);
  };

  return (
    <Button
      size={size}
      variant={variant}
      isLoading={isLoading}
      disabled={disabled}
      className={className}
      onClick={handleSignOut}
    >
      {children}
    </Button>
  );
};

export default SignOutButton;
