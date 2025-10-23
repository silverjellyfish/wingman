// Contributors: Vince
// Time: 0.1 hour

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="skeleton"
         className={cn("bg-accent animate-pulse rounded-md", className)}
         {...props}
      />
   );
}

export { Skeleton };
