import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Screen =
   | "ride"
   | "flightInput"
   | "flightDate"
   | "loading"
   | "groupMatching"
   | "flightResults"
   | "flightPreferences"
   | "groupDetail"
   | "rideWithGroup"
   | "trip"
   | "profile";

interface ProfileScreenProps {
   onNavigate: (screen: Screen) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState("John Doe");
   const [email, setEmail] = useState("john@example.com");
   const [phone, setPhone] = useState("+1 (555) 123-4567");

   const handleSave = () => {
      setIsEditing(false);
   };

   return (
      <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Profile</h1>
            <Button
               onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
               variant="ghost"
               size="sm"
               className="text-white hover:text-gray-300 hover:bg-[#28282d]"
            >
               {isEditing ? "Save" : "Edit"}
            </Button>
         </div>

         <div className="flex-1">
            <div className="flex flex-col items-center mb-8">
               <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gray-600 text-white text-2xl">
                     {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
               </Avatar>
               {isEditing && (
                  <Button
                     variant="ghost"
                     size="sm"
                     className="text-sm text-gray-400 hover:text-white hover:bg-[#28282d]"
                  >
                     Change Photo
                  </Button>
               )}
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-400">
                     Name
                  </Label>
                  <Input
                     id="name"
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     disabled={!isEditing}
                     className="bg-[#28282d] text-white border-none focus-visible:ring-white/20 disabled:opacity-60"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-400">
                     Email
                  </Label>
                  <Input
                     id="email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     disabled={!isEditing}
                     className="bg-[#28282d] text-white border-none focus-visible:ring-white/20 disabled:opacity-60"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-400">
                     Phone
                  </Label>
                  <Input
                     id="phone"
                     type="tel"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     disabled={!isEditing}
                     className="bg-[#28282d] text-white border-none focus-visible:ring-white/20 disabled:opacity-60"
                  />
               </div>
            </div>
         </div>

         <div className="mt-auto">
            <nav className="flex justify-around items-center py-4 border-t border-[#28282d]">
               <button
                  onClick={() => onNavigate("ride")}
                  className="flex flex-col items-center gap-1"
               >
                  <div className="w-2 h-2 rounded-full bg-[#28282d]" />
                  <span className="text-xs">Ride</span>
               </button>
               <button
                  onClick={() => onNavigate("trip")}
                  className="flex flex-col items-center gap-1"
               >
                  <div className="w-2 h-2 rounded-full bg-[#28282d]" />
                  <span className="text-xs">Trips</span>
               </button>
               <button
                  onClick={() => onNavigate("profile")}
                  className="flex flex-col items-center gap-1"
               >
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-xs">Profile</span>
               </button>
            </nav>
         </div>
      </div>
   );
}
