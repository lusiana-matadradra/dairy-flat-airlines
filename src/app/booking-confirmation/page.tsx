"use client";

import { useSearchParams } from "next/navigation";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-green-200">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            Booking Confirmed
          </h1>

          <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            E-Ticket
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-slate-700">

          <div className="space-y-4">
            <p>
              <strong>Reference:</strong>{" "}
              {searchParams.get("reference")}
            </p>

            <p>
              <strong>Passenger:</strong>{" "}
              {searchParams.get("name")}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {searchParams.get("email")}
            </p>

            <p>
              <strong>Flight:</strong>{" "}
              {searchParams.get("flight")}
            </p>
          </div>

          <div className="space-y-4">
            <p>
              <strong>Route:</strong>{" "}
              {searchParams.get("origin")} →{" "}
              {searchParams.get("destination")}
            </p>

            <p>
              <strong>Departure:</strong>{" "}
              {searchParams.get("departure")}
            </p>

            <p>
              <strong>Arrival:</strong>{" "}
              {searchParams.get("arrival")}
            </p>

            <p className="text-3xl font-bold text-slate-900">
              ${searchParams.get("price")}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}