"use client";

import { useState } from "react";

export default function PassengerPage() {
  const [bookingReference, setBookingReference] =
    useState("");

  const [booking, setBooking] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSearch() {
    setLoading(true);

    setError("");

    const res = await fetch(
      `/api/passengers?bookingReference=${bookingReference}`
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);

      setBooking(null);

      setLoading(false);

      return;
    }

    setBooking(data);

    setLoading(false);
  }

  async function cancelBooking() {
    if (!booking) return;

    const confirmCancel = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `/api/bookings/${booking.bookingReference}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);

        return;
      }

      alert(
        "Booking cancelled successfully"
      );

      setBooking(null);

      setBookingReference("");

      setError("");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to cancel booking");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Passenger Lookup
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Enter Booking Reference"
            value={bookingReference}
            onChange={(e) =>
              setBookingReference(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3 mb-4"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-slate-800 text-white p-3 rounded-lg hover:bg-slate-700 disabled:bg-slate-400"
          >
            {loading
              ? "Searching..."
              : "Search Booking"}
          </button>

          {error && (
            <p className="text-red-500 mt-4">
              {error}
            </p>
          )}

          {booking && (
            <div className="mt-6 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Booking Details
              </h2>

              <p>
                <strong>Reference:</strong>{" "}
                {booking.bookingReference}
              </p>

              <p>
                <strong>Passenger:</strong>{" "}
                {booking.passengerName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {booking.email}
              </p>

              <p>
                <strong>Flight ID:</strong>{" "}
                {booking.flightId}
              </p>

              <button
                onClick={cancelBooking}
                className="w-full bg-red-600 text-white p-3 rounded-lg mt-6 hover:bg-red-500"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}