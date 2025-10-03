import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Plane } from "lucide-react";

interface RegisterPageProps {
   onNavigateToLogin: () => void;
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { register } = useAuth();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
               <div className="flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-primary" />
               </div>
               <CardTitle className="text-2xl text-center">
                  Create an account
               </CardTitle>
               <CardDescription className="text-center">
                  Enter your information to get started
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="confirmPassword">Confirm Password</Label>
                     <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                     />
                  </div>
                  {error && (
                     <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                        {error}
                     </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Creating account..." : "Create account"}
                  </Button>
               </form>
               <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <button
                     onClick={onNavigateToLogin}
                     className="text-primary hover:underline"
                  >
                     Sign in
                  </button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
