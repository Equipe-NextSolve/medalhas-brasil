import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <div className="relative w-full group">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "peer w-full min-w-0 outline-none",
          "h-10 rounded-t-md px-3 pt-4 pb-1",
          "text-sm font-medium text-black placeholder:text-transparent",
          "bg-white border-0 border-b-2 border-gray/40",
          "transition-all duration-200 ease-in-out",
          "focus:border-yellow",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-black",
          className
        )}
        {...props}
      />
      {/* Animated bottom border */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow transition-all duration-300 peer-focus:w-full" />
    </div>
  )
}

export { Input }
