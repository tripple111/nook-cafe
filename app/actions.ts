"use server";

import { ReservationSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createReservationAction(formData: unknown) {
  const result = ReservationSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, errors: result.error };
  }

  const reservation = result.data;

  const { error: insertError } = await supabase
    .from("reservations")
    .insert(reservation);

  if (insertError) {
    return { success: false, error: "Failed to save reservation" };
  }

  try {
    await resend.emails.send({
      from: "Nook Cafe <onboarding@resend.dev>",
      to: reservation.email,
      subject: "Your Nook Cafe Reservation is Confirmed",
      text: `Hi ${reservation.name},\n\nYour reservation at Nook Cafe is confirmed.\n\nDate: ${reservation.date}\nTime: ${reservation.time}\nParty size: ${reservation.party_size}\n\nWe look forward to seeing you!\n\nNook Cafe`,
    });
  } catch (emailError) {
    console.error("Failed to send reservation confirmation email:", emailError);
  }

  return { success: true };
}
