"use client";

import {
  Suspense
} from "react";

import {
  useSearchParams
} from "next/navigation";

function BookingConfirmationContent() {

  const searchParams =
    useSearchParams();

  const reference =
    searchParams.get("reference");

  const flight =
    searchParams.get("flight");

  const name =
    searchParams.get("name");

  const email =
    searchParams.get("email");

  const origin =
    searchParams.get("origin");

  const destination =
    searchParams.get(
      "destination"
    );

  const departure =
    searchParams.get(
      "departure"
    );

  const arrival =
    searchParams.get(
      "arrival"
    );

  const price =
    searchParams.get("price");

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-green-200 p-10">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-5xl font-black text-green-700">
            Booking Confirmed
          </h1>

          <span className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold">
            E-Ticket
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 text-slate-700">

          <div className="space-y-5">

            <p>
              <strong>
                Reference:
              </strong>{" "}
              {reference}
            </p>

            <p>
              <strong>
                Passenger:
              </strong>{" "}
              {name}
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {email}
            </p>

            <p>
              <strong>
                Flight:
              </strong>{" "}
              {flight}
            </p>
          </div>

          <div className="space-y-5">

            <p>
              <strong>
                Route:
              </strong>{" "}
              {origin} →{" "}
              {destination}
            </p>

            <p>
              <strong>
                Departure:
              </strong>{" "}
              {departure}
            </p>

            <p>
              <strong>
                Arrival:
              </strong>{" "}
              {arrival}
            </p>

            <p className="text-4xl font-black text-slate-900">
              ${price}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {

  return (
    <Suspense
      fallback={
        <div className="p-10">
          Loading...
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}