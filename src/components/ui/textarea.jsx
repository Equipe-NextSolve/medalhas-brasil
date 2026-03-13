import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }) {
  return (
    <div className="relative w-full group">
      <textarea
        data-slot="textarea"
        className={cn(
          "peer w-full min-w-0 outline-none resize-none",
          "min-h-24 rounded-t-md px-3 pt-4 pb-2",
          "text-sm font-medium text-black placeholder:text-transparent",
          "bg-white border-0 border-b-2 border-gray/40",
          "transition-all duration-200 ease-in-out",
          "focus:border-yellow",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Textarea }
