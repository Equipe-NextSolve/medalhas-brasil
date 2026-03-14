"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { RxChevronDown, RxChevronUp, RxCheck } from "react-icons/rx"

function Select({ ...props }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({ className, ...props }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ ...props }) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({ className, children, ...props }) {
  return (
    <div className="relative w-full group">
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "peer w-full outline-none",
          "h-10 rounded-t-md px-3 pt-4 pb-1",
          "text-sm font-medium text-black",
          "bg-white border-0 border-b-2 border-gray/40",
          "transition-all duration-200 ease-in-out",
          "data-[state=open]:border-yellow",
          "flex items-center justify-between whitespace-nowrap select-none",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "data-placeholder:text-gray/50",
          "cursor-pointer",
          
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <RxChevronDown className="size-4 text-gray/60 shrink-0 pointer-events-none transition-transform duration-200 data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-yellow transition-all duration-300 peer-data-[state=open]:w-full" />
    </div>
  )
}

function SelectContent({ className, children, position = "popper", align = "center", ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-white text-black shadow-lg ring-1 ring-black/5",
          "rounded-b-md min-w-36 relative z-50",
          "max-h-(--radix-select-content-available-height) overflow-x-hidden overflow-y-auto",
          "data-open:animate-in data-closed:animate-out",
          "data-closed:fade-out-0 data-open:fade-in-0",
          "data-closed:zoom-out-95 data-open:zoom-in-95",
          "duration-100 origin-(--radix-select-content-transform-origin)",
          position === "popper" && "data-[side=bottom]:translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className="p-1"
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-gray px-1.5 py-1 text-xs font-semibold uppercase tracking-wide", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-md py-2 pr-8 pl-3 text-sm text-black outline-none",
        "transition-colors duration-150",
        "focus:bg-yellow/10 focus:text-black",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
      
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <RxCheck className="size-3.5 text-yellow" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-gray/20 -mx-1 my-1 h-px pointer-events-none", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("bg-white z-10 flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <RxChevronUp className="size-4 text-gray/60" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("bg-white z-10 flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <RxChevronDown className="size-4 text-gray/60" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}