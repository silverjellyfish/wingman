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

interface LoginPageProps {
   onNavigateToRegister: () => void;
}

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { login } = useAuth();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
         await login(email, password);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Login failed");
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
                  Welcome back
               </CardTitle>
               <CardDescription className="text-center">
                  Enter your credentials to access your account
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
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
                  {error && (
                     <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                        {error}
                     </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
               </form>
               <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <button
                     onClick={onNavigateToRegister}
                     className="text-primary hover:underline"
                  >
                     Sign up
                  </button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
