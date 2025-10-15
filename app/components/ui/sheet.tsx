import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/50"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom"
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  const sideVariants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
  }

  return (
    <motion.div
      initial={sideVariants[side].initial}
      animate={sideVariants[side].animate}
      exit={sideVariants[side].exit}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={cn(
        "fixed z-50 bg-white shadow-xl",
        side === "right" && "inset-y-0 right-0 w-full sm:w-96",
        side === "left" && "inset-y-0 left-0 w-full sm:w-96",
        side === "top" && "inset-x-0 top-0 h-full sm:h-96",
        side === "bottom" && "inset-x-0 bottom-0 h-full sm:h-96",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-2 p-6 border-b", className)}
      {...props}
    />
  )
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-2xl font-bold", className)}
      {...props}
    />
  )
}

