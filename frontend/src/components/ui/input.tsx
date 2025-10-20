// Contributors: Vince
// Time: 0.1 hour

import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
   icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
   if (icon) {
      return (
         <div className="relative w-full">
            <div className="absolute left-[14px] top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
               {icon}
            </div>
            <input
               type={type}
               data-slot="input"
               className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-primary-foreground text-primary border-accent h-9 w-full min-w-0 rounded-[10px] border-[2px] pl-[calc(14px+20px+12px)] pr-[14px] py-[12px] text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-100 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  className
               )}
               {...props}
            />
         </div>
      );
   }

   return (
      <input
         type={type}
         data-slot="input"
         className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-primary-foreground text-primary border-accent h-9 w-full min-w-0 rounded-[10px] border-[2px] px-[14px] py-[12px] text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-100 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
         )}
         {...props}
      />
   );
}

export { Input };
