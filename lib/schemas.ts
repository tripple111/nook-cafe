import { z } from "zod";

export const ReservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  party_size: z.number().min(1).max(20),
});

export type Reservation = z.infer<typeof ReservationSchema>;
