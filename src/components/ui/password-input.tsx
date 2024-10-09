"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="flex gap-2 items-center cursor-pointer">
        <Input
          type={showPassword ? "text" : "password"}
          suffix={
            showPassword ? (
              <EyeIcon
                className="-ml-10"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeClosedIcon
                className="-ml-10"
                onClick={() => setShowPassword(true)}
              />
            )
          }
          className={className}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
