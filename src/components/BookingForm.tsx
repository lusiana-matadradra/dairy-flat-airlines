"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  flightId: string;
  flightNumber?: string;
  origin?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  price?: number;
  capacity?: number;
  bookedSeats?: number;
}

export default function BookingForm({
  flightId,
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  price,
  capacity,
  bookedSeats,
}: BookingFormProps) {

  const router = useRouter();

  const [passengerName, setPassengerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            passengerName,
            email,
            flightId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(
          data.error ||
            "Booking failed"
        );

        setLoading(false);

        return;
      }

    setLoading(false);

router.push(
  `/booking-confirmation?reference=${data.bookingReference}&flight=${flightNumber}&name=${passengerName}&email=${email}&origin=${origin}&destination=${destination}&departure=${departureTime}&arrival=${arrivalTime}&price=${price}`
);

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

      setLoading(false);
    }
  }

  return (
    <div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 border-t pt-6"
      >

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) =>
              setPassengerName(
                e.target.value
              )
            }
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <input
            type="email"
            placeholder="Passenger Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <button
            type="submit"
            disabled={
              loading ||
              bookedSeats ===
                capacity
            }
            className="bg-slate-800 text-white rounded-xl p-3 hover:bg-slate-700 transition disabled:bg-red-400 font-semibold"
          >

            {loading
              ? "Creating Booking..."
              : bookedSeats ===
                capacity
              ? "Flight Full"
              : "Create Booking"}

          </button>
        </div>
      </form>


    </div>
  );
}