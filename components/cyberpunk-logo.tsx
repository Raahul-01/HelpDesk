"use client"

import Image from "next/image"

interface CyberpunkLogoProps {
  className?: string
}

export function CyberpunkLogo({ className = "h-8 w-8" }: CyberpunkLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/image.png"
        alt="HelpDesk Logo"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
