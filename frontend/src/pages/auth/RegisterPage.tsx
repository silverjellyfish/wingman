// Contributors: Michelle, Vince
// Time: 3 hours

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Interface for props
interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onNext: (data: { name: string; email: string; password: string }) => void;
}

export function RegisterPage({ onNavigateToLogin, onNext }: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // If user tries to type a domain, prevent it
    if (value.includes("@") && !value.endsWith("@vanderbilt.edu")) {
      const username = value.split("@")[0];
      setEmail(username + "@vanderbilt.edu");
    } else {
      setEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email domain
    if (!email.endsWith("@vanderbilt.edu")) {
      setError("Only @vanderbilt.edu emails are allowed");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Call backend to check if email already exists
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/check-email?email=${encodeURIComponent(email)}`
      );

      if (!res.ok) {
        throw new Error("Failed to check email availability");
      }

      const data = await res.json();

      if (data.exists) {
        setError("This email is already in use.");
        return;
      }

      // If email is free, proceed to next step
      onNext({ name, email, password });
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#16161b] h-screen flex flex-col relative">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[80px] items-center justify-center pb-[40px] pt-[80px] px-[40px] w-full min-h-full">
          {/* Header */}
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Create an Account
            </p>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="content-stretch flex flex-col gap-[20px] items-start relative w-full max-w-md"
          >
            {/* Name */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Name
              </p>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Email
              </p>
              <Input
                type="email"
                placeholder="name@vanderbilt.edu"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            {/* Password */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Password
              </p>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Confirm Password
              </p>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-[6px] w-full">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="content-stretch flex flex-col gap-[2px] items-start relative w-full pt-[80px]">
              <Button type="submit" className="w-full mt-4">
                Continue
              </Button>

              {/* Sign In Link */}
              <div className="text-center text-sm w-full">
                <span className="text-zinc-400">Already have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-white hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
