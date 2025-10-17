// Contributors: Vince, Michelle

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { useAuth } from "../contexts/AuthContext";
import imgAvatar from "../assets/images/avatar.png";
import type { Screen } from "../types";

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { user, logout, deleteAccount } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Profile state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [earliestBeforeBoarding, setEarliestBeforeBoarding] = useState("");
  const [latestBeforeBoarding, setLatestBeforeBoarding] = useState("");
  const [longestWillingToWait, setLongestWillingToWait] = useState("");

  // Fetch user profile from backend
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_BASE_URL}/users/profile/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        console.log("Fetched profile data:", data);

        setName(data.name || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAge(data.age ? data.age.toString() : "");
        setGender(data.gender || "");
        setEarliestBeforeBoarding(data.earliestBefore?.toString() || "");
        setLatestBeforeBoarding(data.latestBefore?.toString() || "");
        setLongestWillingToWait(data.longestWait?.toString() || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user]);

  // Reuse your existing handlers (phone, age, time formatting)
  const handleSave = () => {
    // Add "mins" suffix if not present
    if (earliestBeforeBoarding && !earliestBeforeBoarding.includes("mins")) {
      setEarliestBeforeBoarding(earliestBeforeBoarding + " mins");
    }
    if (latestBeforeBoarding && !latestBeforeBoarding.includes("mins")) {
      setLatestBeforeBoarding(latestBeforeBoarding + " mins");
    }
    if (longestWillingToWait && !longestWillingToWait.includes("mins")) {
      setLongestWillingToWait(longestWillingToWait + " mins");
    }
    setIsEditing(false);

    // Optional: POST updated profile to backend here
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 10) return;
    let formatted = value;
    if (value.length > 6) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    setPhone(formatted);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(value);
    if (value === "" || (numValue >= 0 && numValue <= 99)) {
      setAge(value);
    }
  };

  const handleTimeChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      setter(value);
    };
  };

  const getTimeValue = (value: string) => {
    return isEditing ? value.replace(" mins", "").trim() : value;
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      await deleteAccount(user.id);
      alert("Account deleted successfully.");
      onNavigate("login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  return (
    <div className="bg-[#16161b] h-screen flex flex-col relative">
      {/* Main Content - Scrollable */}
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[69px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          {/* Profile Header */}
          <div className="content-stretch flex items-center justify-between relative w-full">
            <div className="content-stretch flex gap-[19px] items-center relative">
              {/* Avatar */}
              <div className="overflow-clip relative rounded-[9999px] size-[64px]">
                <img
                  alt={name}
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                  src={imgAvatar}
                />
              </div>

              {/* Name and Username */}
              <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative w-[106px]">
                <div className="flex flex-col justify-center relative text-[24px] text-center text-white tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                    {name}
                  </p>
                </div>
                <div className="flex flex-col justify-center relative text-[16px] text-zinc-400 tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                    {username}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="relative size-[32px] cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-white text-[20px]">
                {isEditing ? "check" : "edit"}
              </span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full">
            {/* Email */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Email
              </p>
              <Input type="email" value={email} disabled={true} />
            </div>

            {/* Phone Number */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                style={{ fontWeight: 600 }}
              >
                Phone Number
              </p>
              <Input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                disabled={!isEditing}
              />
            </div>

            {/* Age and Gender Row */}
            <div className="content-stretch flex flex-row gap-[20px] items-center relative w-full">
              {/* Age */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-1/3">
                <p
                  className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                  style={{ fontWeight: 600 }}
                >
                  Age
                </p>
                <Input
                  type="text"
                  value={age}
                  onChange={handleAgeChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Gender */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-2/3">
                <p
                  className="leading-none relative text-[18px] text-nowrap text-white tracking-[0.07px] whitespace-pre"
                  style={{ fontWeight: 600 }}
                >
                  Gender
                </p>
                {isEditing ? (
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-primary-foreground text-primary border-accent h-9 w-full rounded-[10px] border-[2px] px-[14px] py-[12px] text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm [&>option]:rounded-lg"
                  >
                    <option value="Male" className="rounded-lg">
                      Male
                    </option>
                    <option value="Female" className="rounded-lg">
                      Female
                    </option>
                    <option value="Other" className="rounded-lg">
                      Other
                    </option>
                  </select>
                ) : (
                  <Input type="text" value={gender} disabled={true} />
                )}
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none min-w-full relative text-[18px] text-white tracking-[0.07px] w-[min-content]"
                style={{ fontWeight: 600 }}
              >
                Minutes before boarding
              </p>
            </div>

            <div className="content-stretch flex flex-row gap-[20px] items-center relative w-full">
              {/* Earliest before boarding */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                <p
                  className="leading-none min-w-full relative text-[14px] text-white tracking-[0.07px] w-[min-content]"
                  style={{ fontWeight: 600 }}
                >
                  Earliest
                </p>
                <Input
                  type="text"
                  value={getTimeValue(earliestBeforeBoarding)}
                  onChange={handleTimeChange(setEarliestBeforeBoarding)}
                  disabled={!isEditing}
                />
              </div>

              {/* Latest before boarding */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                <p
                  className="leading-none min-w-full relative text-[14px] text-white tracking-[0.07px] w-[min-content]"
                  style={{ fontWeight: 600 }}
                >
                  Latest
                </p>
                <Input
                  type="text"
                  value={getTimeValue(latestBeforeBoarding)}
                  onChange={handleTimeChange(setLatestBeforeBoarding)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Longest willing to wait */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p
                className="leading-none min-w-full relative text-[18px] text-white tracking-[0.07px] w-[min-content]"
                style={{ fontWeight: 600 }}
              >
                Max wait after landing
              </p>
              <Input
                type="text"
                value={getTimeValue(longestWillingToWait)}
                onChange={handleTimeChange(setLongestWillingToWait)}
                disabled={!isEditing}
              />
            </div>

            {/* Logout Button */}
            <Button
              onClick={() => {
                logout();
                onNavigate("ride");
              }}
              className="w-full mt-4"
              variant="destructive"
            >
              Logout
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="w-full mt-2"
              variant="outline"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Sticky */}
      <div className="sticky bottom-0 w-full z-50">
        <BottomNavigation currentScreen="profile" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
