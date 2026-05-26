"use client";

import { useState } from "react";

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
  const [passengerName, setPassengerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [bookingData, setBookingData] =
    useState<any>(null);

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

      setBookingData({
        bookingReference:
          data.bookingReference,
        passengerName,
        email,
      });

      setPassengerName("");

      setEmail("");

      setLoading(false);

      setTimeout(() => {
        window.location.reload();
      }, 15000);

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

      {bookingData && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-green-700">
              Booking Confirmed
            </h3>

            <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              E-Ticket
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-slate-700">
            <div className="space-y-3">
              <p>
                <strong>Reference:</strong>{" "}
                {
                  bookingData.bookingReference
                }
              </p>

              <p>
                <strong>Passenger:</strong>{" "}
                {
                  bookingData.passengerName
                }
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {bookingData.email}
              </p>

              <p>
                <strong>Flight:</strong>{" "}
                {flightNumber}
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Route:</strong>{" "}
                {origin} →{" "}
                {destination}
              </p>

              <p>
                <strong>Departure:</strong>{" "}
                {departureTime}
              </p>

              <p>
                <strong>Arrival:</strong>{" "}
                {arrivalTime}
              </p>

              <p className="text-2xl font-bold text-slate-900">
                ${price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}