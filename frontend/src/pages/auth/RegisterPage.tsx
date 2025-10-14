// TODO: SEND EMAIL CONFIRMATION

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";

interface RegisterPageProps {
   onNavigateToLogin: () => void;
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
   const { register } = useAuth();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(true);

      try {
         await register(email, password, name);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="bg-[#16161b] h-screen flex flex-col relative">
         {/* Main Content - Scrollable */}
         <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="content-stretch flex flex-col gap-[80px] items-center justify-center pb-[40px] pt-[80px] px-[40px] w-full min-h-full">
               {/* Header */}
               <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                     Create an account
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                     <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={isLoading}
                     >
                        {isLoading ? "Creating account..." : "Create account"}
                     </Button>

                     {/* Sign In Link */}
                     <div className="text-center text-sm w-full">
                        <span className="text-zinc-400">
                           Already have an account?{" "}
                        </span>
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
