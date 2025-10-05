"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Database, BarChart3, Plus, Menu, X } from "lucide-react"
import { CyberpunkLogo } from "@/components/cyberpunk-logo"
import { useState } from "react"

export function CyberpunkHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 border-b border-cyan-500/30 bg-black/90 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Clean Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              {/* Simple logo container - no effects */}
              <div className="p-2">
                <CyberpunkLogo className="h-8 w-8" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300 group-hover:animate-pulse">
                &lt;HelpDesk/&gt;
              </h1>
              <p className="text-xs text-cyan-200 font-mono group-hover:text-cyan-100 transition-colors duration-300">
                // Next-Gen Support System v2.0
              </p>
              {/* Status indicator */}
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono">ONLINE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tickets" className="group relative">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <Database className="h-4 w-4 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="text-cyan-300 font-mono group-hover:text-white transition-colors">tickets.db</span>
              </div>
            </Link>
            
            <Link href="/tickets?tab=sla" className="group relative">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                <BarChart3 className="h-4 w-4 text-purple-400 group-hover:text-white transition-colors" />
                <span className="text-purple-300 font-mono group-hover:text-white transition-colors">sla_monitor.exe</span>
              </div>
            </Link>

            <Button asChild className="group relative bg-transparent border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-white transition-all duration-300 font-mono px-6 py-2">
              <Link href="/tickets/new">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>$ ./create-ticket</span>
                </div>
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-cyan-400 hover:text-white hover:bg-cyan-500/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/30">
            <nav className="flex flex-col gap-3">
              <Link 
                href="/tickets" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Database className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-300 font-mono">tickets.db</span>
              </Link>
              
              <Link 
                href="/tickets?tab=sla" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 font-mono">sla_monitor.exe</span>
              </Link>

              <Button asChild className="justify-start bg-transparent border border-cyan-500/50 text-cyan-400 hover:text-white hover:bg-cyan-500/10 font-mono">
                <Link href="/tickets/new" onClick={() => setIsMenuOpen(false)}>
                  <Plus className="h-4 w-4 mr-2" />
                  $ ./create-ticket
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-2 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-4 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>
    </header>
  )
}
