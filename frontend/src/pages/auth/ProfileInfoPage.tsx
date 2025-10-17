import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileInfoPageProps {
  onContinue: () => void;
}

export function ProfileInfoPage({ onContinue }: ProfileInfoPageProps) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        You must be logged in to continue
      </div>
    );
  }
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [earliestBefore, setEarliestBefore] = useState("");
  const [latestBefore, setLatestBefore] = useState("");
  const [longestWait, setLongestWait] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!phone || phone.length < 12) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!age || Number(age) < 16) {
      setError("Please enter a valid age (16+).");
      return;
    }

    if (!gender) {
      setError("Please select your gender.");
      return;
    }

    if (!earliestBefore) {
      setError("Please enter earliest before boarding time.");
      return;
    }

    if (!latestBefore) {
      setError("Please enter latest before boarding time.");
      return;
    }

    if (!longestWait) {
      setError("Please enter longest wait after landing.");
      return;
    }
    console.log(user);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      // change later
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.id,
          name: user.name,
          email: user.email,
          username: user.name,
          university: "Vanderbilt University",
          phone,
          age: Number(age),
          gender,
          earliestBefore: Number(earliestBefore),
          latestBefore: Number(latestBefore),
          longestWait: Number(longestWait),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to save profile info");
      }

      onContinue();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save profile info"
      );
    }
  };

  return (
    <div className="bg-[#16161b] h-screen flex flex-col relative">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-[60px] items-center justify-center pb-[40px] pt-[80px] px-[40px] w-full min-h-full">
          {/* Header */}
          <div className="text-[32px] text-white text-center w-full">
            <p className="leading-none font-semibold">
              Tell us more about yourself
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[20px] w-full max-w-md"
          >
            {/* Phone */}
            <div className="flex flex-col gap-[4px] w-full">
              <p className="text-[18px] text-white font-semibold">
                Phone Number
              </p>
              <Input
                type="tel"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  const formatted = digits
                    .replace(/^(\d{3})(\d)/, "$1-$2")
                    .replace(/-(\d{3})(\d)/, "-$1-$2")
                    .slice(0, 12);
                  setPhone(formatted);
                }}
                required
              />
            </div>

            {/* Age */}
            <div className="flex flex-col gap-[4px] w-full">
              <p className="text-[18px] text-white font-semibold">Age</p>
              <Input
                type="number"
                min="16"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col w-full">
              <p className="text-[18px] text-white mb-2 font-semibold">
                Gender
              </p>
              <div className="flex flex-wrap gap-6">
                {["male", "female", "other"].map((option) => (
                  <Button
                    key={option}
                    variant={gender === option ? "default" : "outline"}
                    size="default"
                    onClick={() =>
                      setGender(option as "male" | "female" | "other")
                    }
                    className="min-w-[90px] max-w-[120px]"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Earliest before boarding */}
            <div className="flex flex-col gap-[4px] w-full">
              <p className="text-[18px] text-white font-semibold">
                Earliest before boarding (min)
              </p>
              <Input
                type="number"
                min="0"
                value={earliestBefore}
                onChange={(e) => setEarliestBefore(e.target.value)}
                required
              />
            </div>

            {/* Latest before boarding */}
            <div className="flex flex-col gap-[4px] w-full">
              <p className="text-[18px] text-white font-semibold">
                Latest before boarding (min)
              </p>
              <Input
                type="number"
                min="0"
                value={latestBefore}
                onChange={(e) => setLatestBefore(e.target.value)}
                required
              />
            </div>

            {/* Longest willing to wait */}
            <div className="flex flex-col gap-[4px] w-full">
              <p className="text-[18px] text-white font-semibold">
                Longest willing to wait after landing (min)
              </p>
              <Input
                type="number"
                min="0"
                value={longestWait}
                onChange={(e) => setLongestWait(e.target.value)}
                required
              />
            </div>

            {/* Error message */}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            {/* Submit */}
            <div className="pt-[40px]">
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
