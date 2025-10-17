import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";

// Interface for props
interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
}

// LoginPage component
export function LoginPage({
  onNavigateToRegister,
  onLoginSuccess,
}: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes("@") && !value.endsWith("@vanderbilt.edu")) {
      const username = value.split("@")[0];
      setEmail(username + "@vanderbilt.edu");
    } else {
      setEmail(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@vanderbilt.edu")) {
      setError("Only @vanderbilt.edu emails are allowed");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#16161b] h-screen flex flex-col relative">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[80px] items-center justify-center pb-[40px] pt-[80px] px-[40px] w-full min-h-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Login
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="content-stretch flex flex-col gap-[20px] items-start relative w-full max-w-md"
          >
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

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-[6px] w-full">
                {error}
              </div>
            )}

            <div className="content-stretch flex flex-col gap-[2px] items-start relative w-full pt-[80px]">
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </Button>

              <div className="text-center text-sm w-full">
                <span className="text-zinc-400">Don't have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-white hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
