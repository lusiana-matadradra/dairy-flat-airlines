import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const client = await clientPromise;

    const db = client.db("airlineDB");

    await db.collection("schedules").deleteMany({});

    const flights: any[] = [];

    function addFlight(
      flightNumber: string,
      origin: string,
      destination: string,
      aircraft: string,
      departureTime: string,
      arrivalTime: string,
      price: number,
      capacity: number
    ) {

      flights.push({
        flightNumber,
        origin,
        destination,
        aircraft,
        departureTime,
        arrivalTime,
        price,
        capacity,
        bookedSeats: 0,
      });

    }

    for (let week = 0; week < 4; week++) {

      const baseDay = week * 7;

      // =========================
      // SYDNEY FLIGHTS
      // =========================

      const sydOut = String(baseDay + 6).padStart(2, "0");
      const sydReturn = String(baseDay + 8).padStart(2, "0");

      addFlight(
        `DFSYD${week + 1}`,
        "NZNE",
        "YSSY",
        "SyberJet SJ30i",
        `2026-06-${sydOut}T10:00:00`,
        `2026-06-${sydOut}T13:00:00`,
        1299,
        6
      );

      addFlight(
        `DFSYDR${week + 1}`,
        "YSSY",
        "NZNE",
        "SyberJet SJ30i",
        `2026-06-${sydReturn}T15:00:00`,
        `2026-06-${sydReturn}T20:00:00`,
        1399,
        6
      );

      // =========================
      // ROTORUA FLIGHTS
      // =========================

      for (let day = 1; day <= 5; day++) {

        const currentDay = String(
          baseDay + day
        ).padStart(2, "0");

        addFlight(
          `DFROTAM${week}${day}`,
          "NZNE",
          "NZRO",
          "Cirrus SF50",
          `2026-06-${currentDay}T07:00:00`,
          `2026-06-${currentDay}T08:00:00`,
          299,
          4
        );

        addFlight(
          `DFROTRAM${week}${day}`,
          "NZRO",
          "NZNE",
          "Cirrus SF50",
          `2026-06-${currentDay}T09:00:00`,
          `2026-06-${currentDay}T10:00:00`,
          299,
          4
        );

        addFlight(
          `DFROTPM${week}${day}`,
          "NZNE",
          "NZRO",
          "Cirrus SF50",
          `2026-06-${currentDay}T17:00:00`,
          `2026-06-${currentDay}T18:00:00`,
          299,
          4
        );

        addFlight(
          `DFROTRPM${week}${day}`,
          "NZRO",
          "NZNE",
          "Cirrus SF50",
          `2026-06-${currentDay}T19:00:00`,
          `2026-06-${currentDay}T20:00:00`,
          299,
          4
        );

      }

      // =========================
      // GREAT BARRIER
      // =========================

      const gbDays = [1, 3, 5];

      gbDays.forEach((day, index) => {

        const outboundDay = String(
          baseDay + day
        ).padStart(2, "0");

        const returnDay = String(
          baseDay + day + 1
        ).padStart(2, "0");

        addFlight(
          `DFGB${week}${index}`,
          "NZNE",
          "NZGB",
          "Cirrus SF50",
          `2026-06-${outboundDay}T08:00:00`,
          `2026-06-${outboundDay}T09:00:00`,
          349,
          4
        );

        addFlight(
          `DFGBR${week}${index}`,
          "NZGB",
          "NZNE",
          "Cirrus SF50",
          `2026-06-${returnDay}T10:00:00`,
          `2026-06-${returnDay}T11:00:00`,
          349,
          4
        );

      });

      // =========================
      // CHATHAM ISLANDS
      // =========================

      const chatDays = [2, 5];

      chatDays.forEach((day, index) => {

        const outboundDay = String(
          baseDay + day
        ).padStart(2, "0");

        const returnDay = String(
          baseDay + day + 1
        ).padStart(2, "0");

        addFlight(
          `DFCHAT${week}${index}`,
          "NZNE",
          "NZCI",
          "HondaJet Elite",
          `2026-06-${outboundDay}T08:00:00`,
          `2026-06-${outboundDay}T10:30:00`,
          899,
          5
        );

        addFlight(
          `DFCHATR${week}${index}`,
          "NZCI",
          "NZNE",
          "HondaJet Elite",
          `2026-06-${returnDay}T13:00:00`,
          `2026-06-${returnDay}T15:30:00`,
          899,
          5
        );

      });

      // =========================
      // LAKE TEKAPO
      // =========================

      const tekapoOut = String(
        baseDay + 1
      ).padStart(2, "0");

      const tekapoReturn = String(
        baseDay + 2
      ).padStart(2, "0");

      addFlight(
        `DFTEK${week}`,
        "NZNE",
        "NZTL",
        "HondaJet Elite",
        `2026-06-${tekapoOut}T09:00:00`,
        `2026-06-${tekapoOut}T11:00:00`,
        699,
        5
      );

      addFlight(
        `DFTEKR${week}`,
        "NZTL",
        "NZNE",
        "HondaJet Elite",
        `2026-06-${tekapoReturn}T12:00:00`,
        `2026-06-${tekapoReturn}T14:00:00`,
        699,
        5
      );

    }

    await db.collection("schedules")
      .insertMany(flights);

    return NextResponse.json({
      message: "Database seeded successfully",
      totalFlights: flights.length,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to seed database",
      },
      {
        status: 500,
      }
    );

  }

}