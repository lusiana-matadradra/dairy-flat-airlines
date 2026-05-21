import { Flight } from "@/types/flight";
import BookingForm from "./BookingForm";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({
  flight,
}: FlightCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-slate-900">
          {flight.flightNumber}
        </h2>

        <div className="flex gap-2">
          {flight.bookedSeats >=
            flight.capacity && (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              FULL
            </span>
          )}

          <span className="bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm font-medium">
            {flight.aircraft}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-slate-700">
        <p className="text-lg font-medium">
          {flight.origin} →{" "}
          {flight.destination}
        </p>

        <p>
          <strong>Departure:</strong>{" "}
          {new Date(
            flight.departureTime
          ).toLocaleString()}
        </p>

        <p>
          <strong>Arrival:</strong>{" "}
          {new Date(
            flight.arrivalTime
          ).toLocaleString()}
        </p>

        <p>
          <strong>Seats Booked:</strong>{" "}
          {flight.bookedSeats} /{" "}
          {flight.capacity}
        </p>

        <p>
          <strong>Seats Remaining:</strong>{" "}
          <span
            className={
              flight.capacity -
                flight.bookedSeats <=
              2
                ? "text-red-600 font-bold"
                : "text-green-600 font-bold"
            }
          >
            {flight.capacity -
              flight.bookedSeats}
          </span>
        </p>
      </div>

      <div className="mt-6 text-3xl font-bold text-slate-900">
        ${flight.price}
      </div>

      <BookingForm
        flightId={flight._id || ""}
        flightNumber={
          flight.flightNumber
        }
        origin={flight.origin}
        destination={
          flight.destination
        }
        departureTime={new Date(
          flight.departureTime
        ).toLocaleString()}
        arrivalTime={new Date(
          flight.arrivalTime
        ).toLocaleString()}
        price={flight.price}
        capacity={flight.capacity}
        bookedSeats={
          flight.bookedSeats
        }
      />
    </div>
  );
}