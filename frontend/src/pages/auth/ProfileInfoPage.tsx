// Contributors: Michelle
// Time: 2 hours

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/pages/LoadingScreen";

// Interface for props
interface ProfileInfoPageProps {
  tempUserData: { name: string; email: string; password: string };
  onComplete: () => void;
}

export function ProfileInfoPage({
  tempUserData,
  onComplete,
}: ProfileInfoPageProps) {
  const { user, register } = useAuth();
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

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

    try {
      const firebaseUser = await register(
        tempUserData.email,
        tempUserData.password,
        tempUserData.name
      );

      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: firebaseUser.id,
          name: firebaseUser.name,
          username: firebaseUser.name,
          email: firebaseUser.email,
          university: "Vanderbilt University",
          phone,
          emergencyContact,
          age: Number(age),
          gender,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile info");
      }

      onComplete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save profile info"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#16161b] h-screen flex flex-col relative">
      {isLoading ? (
        <LoadingScreen text="Registering your account..." />
      ) : (
        <div className="bg-[#16161b] h-screen flex flex-col relative">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col gap-[60px] items-center justify-center pb-[40px] pt-[80px] px-[40px] w-full min-h-full">
              {/* Header */}
              <div className="text-[32px] text-white text-center w-full">
                <p className="leading-none" style={{ fontWeight: 600 }}>
                  Tell us More About Yourself!
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
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
                        type="button"
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

                <div className="flex flex-col gap-[4px] w-full">
                  <p className="text-[18px] text-white font-semibold">
                    Emergency Contact
                  </p>
                  <Input
                    type="tel"
                    placeholder="123-456-7890"
                    value={emergencyContact}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      const formatted = digits
                        .replace(/^(\d{3})(\d)/, "$1-$2")
                        .replace(/-(\d{3})(\d)/, "-$1-$2")
                        .slice(0, 12);
                      setEmergencyContact(formatted);
                    }}
                    required
                  />
                </div>

                {/* Error message */}
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                {/* Submit */}
                <div className="pt-[40px]">
                  <Button type="submit" className="w-full">
                    Complete Registration
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
