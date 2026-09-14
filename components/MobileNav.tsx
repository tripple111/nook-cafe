"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#reservations", label: "Reservations" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center text-[#5C1A24]"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <div className="font-display text-2xl font-semibold text-[#5C1A24]">
          Nook Cafe
        </div>
        <div className="size-10" />
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-200 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0">
          <div className="flex flex-col items-center gap-4 pt-5 pb-2">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium hover:text-[#5C1A24] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
