"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { createReservationAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const inputClasses =
  "w-full rounded border border-black/15 bg-[#FAF3E7] px-4 py-2.5 text-[#2B211C] placeholder:text-[#2B211C]/40 focus:outline-none focus:ring-2 focus:ring-[#5C1A24]/40";

export function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccess(false);

    const result = await createReservationAction({
      name,
      email,
      phone: phone || undefined,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time,
      party_size: partySize,
    });

    setIsSubmitting(false);

    if (!result.success) {
      if ("errors" in result && result.errors) {
        const firstIssue = result.errors.issues[0];
        setErrorMessage(firstIssue?.message ?? "Please check your details and try again.");
      } else {
        setErrorMessage(
          "error" in result && result.error
            ? result.error
            : "Something went wrong. Please try again."
        );
      }
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setPhone("");
    setDate(undefined);
    setTime("");
    setPartySize(2);
  }

  if (success) {
    return (
      <div className="bg-[#FAF3E7] rounded-lg p-8 text-center">
        <h3 className="font-display text-2xl text-[#5C1A24] mb-2">
          Reservation Confirmed
        </h3>
        <p className="text-[#2B211C]/80">
          Thank you! We&apos;ve sent a confirmation email and look forward to
          seeing you at Nook Cafe.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-medium text-[#5C1A24] underline underline-offset-4"
        >
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Phone <span className="text-[#2B211C]/50">(optional)</span>
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="party_size" className="block text-sm font-medium mb-1.5">
            Party Size
          </label>
          <input
            id="party_size"
            type="number"
            min={1}
            max={20}
            required
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full h-auto justify-start rounded border border-black/15 bg-[#FAF3E7] px-4 py-2.5 text-left font-normal text-[#2B211C] hover:bg-[#FAF3E7]",
                  !date && "text-[#2B211C]/40"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto bg-[#FAF3E7] p-0 ring-[#5C1A24]/15"
              align="start"
              style={
                {
                  "--popover": "#FAF3E7",
                  "--primary": "#5C1A24",
                  "--primary-foreground": "#FAF3E7",
                  "--accent": "#E8DCC8",
                  "--accent-foreground": "#5C1A24",
                  "--muted": "#E8DCC8",
                } as React.CSSProperties
              }
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                autoFocus
                className="bg-[#FAF3E7]"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1.5">
            Time
          </label>
          <select
            id="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-800 bg-red-100 border border-red-300 rounded px-4 py-2.5">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-[#5C1A24] text-[#FAF3E7] font-display font-semibold rounded hover:bg-[#4a151d] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
      >
        {isSubmitting ? "Sending..." : "Reserve Table"}
      </button>
    </form>
  );
}
