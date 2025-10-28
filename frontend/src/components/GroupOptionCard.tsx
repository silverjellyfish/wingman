import { Button } from "./ui/button";

interface GroupMember {
   name: string;
   initial: string;
   isEmpty?: boolean;
}

interface GroupOptionCardProps {
   optionNumber: number;
   isRecommended: boolean;
   members: GroupMember[];
   location: string;
   luggageCount: number;
   time: string;
   onAccept: () => void;
}

export function GroupOptionCard({
   optionNumber,
   isRecommended,
   members,
   location,
   luggageCount,
   time,
   onAccept,
}: GroupOptionCardProps) {
   return (
      <div className="bg-[#28282d] box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[20px] shrink-0 w-full">
         {/* Option Header */}
         <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="flex items-center gap-[8px]">
               <p className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-none text-[16px] text-white tracking-[0.08px]">
                  Option {optionNumber}
               </p>
               {isRecommended && (
                  <div className="bg-green-400/10 box-border px-[8px] py-[4px] rounded-full">
                     <span className="font-['Geist:Medium',_sans-serif] font-medium text-[12px] text-green-400 tracking-[0.06px]">
                        recommended
                     </span>
                  </div>
               )}
            </div>
            <Button
               onClick={onAccept}
               variant="default"
               className="px-[16px] py-[8px] h-auto"
            >
               Accept
            </Button>
         </div>

         {/* Members */}
         <div className="grid grid-cols-2 gap-[12px] w-full">
            {members.map((member, idx) => (
               <div
                  key={idx}
                  className="flex items-center gap-[12px] relative shrink-0"
               >
                  <div
                     className={`flex items-center justify-center relative rounded-full shrink-0 size-[28px] ${
                        member.isEmpty ? "bg-white" : "bg-[#ffffff]"
                     }`}
                  >
                     <p
                        className={`font-['Geist:SemiBold',_sans-serif] font-semibold leading-none text-[16px] tracking-[0.08px] ${
                           member.isEmpty ? "text-black" : "text-[#000000]"
                        }`}
                     >
                        {member.isEmpty && member.name
                           ? member.name.charAt(0).toUpperCase()
                           : member.initial || ""}
                     </p>
                  </div>
                  <p className="font-['Geist:Medium',_sans-serif] font-medium leading-none text-[14px] text-white tracking-[0.07px] truncate">
                     {member.name}
                  </p>
               </div>
            ))}
         </div>

         {/* Details */}
         <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="flex items-center gap-[8px] font-['Geist:Medium',_sans-serif] font-medium text-[14px] tracking-[0.07px]">
               <span className="material-symbols-outlined text-[16px] text-zinc-400">
                  location_on
               </span>
               <span className="text-white">Location:</span>
               <span className="text-zinc-400">{location}</span>
            </div>
            <div className="flex items-center gap-[8px] font-['Geist:Medium',_sans-serif] font-medium text-[14px] tracking-[0.07px]">
               <span className="material-symbols-outlined text-[16px] text-zinc-400">
                  luggage
               </span>
               <span className="text-white">All Luggage:</span>
               <span className="text-zinc-400">{luggageCount}</span>
            </div>
            <div className="flex items-center gap-[8px] font-['Geist:Medium',_sans-serif] font-medium text-[14px] tracking-[0.07px]">
               <span className="material-symbols-outlined text-[16px] text-zinc-400">
                  schedule
               </span>
               <span className="text-white">Time:</span>
               <span className="text-zinc-400">{time}</span>
            </div>
         </div>
      </div>
   );
}
