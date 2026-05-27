"use client";

import { useEffect, useState } from "react";
import FlightCard from "@/components/FlightCard";
import SearchForm from "@/components/SearchForm";

export default function FlightsPage() {

  const [schedules, setSchedules] =
    useState([]);

  const [
    filteredFlights,
    setFilteredFlights,
  ] = useState([]);

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [
    departureDate,
    setDepartureDate,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchSchedules() {

      try {

        const res = await fetch(
          "/api/schedules"
        );

        const data = await res.json();

        setSchedules(data);

        setFilteredFlights(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    fetchSchedules();

  }, []);

  useEffect(() => {

  const filtered = schedules.filter(
    (flight: any) => {

      const flightOrigin =
        flight.origin
          ?.toString()
          .trim()
          .toUpperCase();

      const flightDestination =
        flight.destination
          ?.toString()
          .trim()
          .toUpperCase();

      const searchOrigin =
        origin
          ?.toString()
          .trim()
          .toUpperCase();

      const searchDestination =
        destination
          ?.toString()
          .trim()
          .toUpperCase();

      const matchesOrigin =
        !searchOrigin ||
        flightOrigin.includes(
          searchOrigin
        );

      const matchesDestination =
        !searchDestination ||
        flightDestination.includes(
          searchDestination
        );

      const matchesDate =
      departureDate === "" ||
      flight.departureTime
      .split("T")[0] ===
      departureDate;

      return (
      matchesOrigin &&
      matchesDestination &&
      matchesDate
    );
    }
  );

  console.log(filtered);

  setFilteredFlights(filtered);

}, [
  origin,
  destination,
  departureDate,
  schedules,
]);

  return (

    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <p className="uppercase tracking-[0.3em] text-sm text-slate-500 mb-2">
            Dairy Flat Airlines
          </p>

          <h1 className="text-5xl font-black text-slate-900">
            Flight Schedules
          </h1>

          <p className="text-slate-600 mt-3 text-lg">
            Browse available regional
            flights and manage bookings
            with ease.
          </p>

        </div>

        <SearchForm
          origin={origin}
          destination={destination}
          departureDate={departureDate}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDepartureDate={
            setDepartureDate
          }
        />

        {loading ? (

          <div className="bg-white rounded-2xl p-10 shadow-md text-center text-slate-600 mt-8">
            Loading flights...
          </div>

        ) : filteredFlights.length ===
          0 ? (

          <div className="bg-white rounded-2xl p-10 shadow-md text-center mt-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No Flights Found
            </h2>

            <p className="text-slate-500">
              Try searching with a
              different airport.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {filteredFlights.map(
              (flight: any) => (

                <FlightCard
                  key={
                    flight.flightNumber
                  }
                  flight={flight}
                />

              )
            )}

          </div>

        )}

      </div>

    </main>

  );
}
