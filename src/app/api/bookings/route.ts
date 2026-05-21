import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      passengerName,
      email,
      flightId,
    } = body;

    await client.connect();

    const db = client.db("airlineDB");

    const bookingsCollection =
      db.collection("bookings");

    const schedulesCollection =
      db.collection("schedules");

    const flight =
      await schedulesCollection.findOne({
        _id: new ObjectId(flightId),
      });

    if (!flight) {
      return NextResponse.json(
        { error: "Flight not found" },
        { status: 404 }
      );
    }

    if (
      flight.bookedSeats >=
      flight.capacity
    ) {
      return NextResponse.json(
        { error: "Flight is full" },
        { status: 400 }
      );
    }

    const bookingReference = Math.random()
      .toString(16)
      .substring(2, 10);

    const booking = {
      passengerName,
      email,
      flightId: new ObjectId(
        flightId
      ),
      bookingReference,
      createdAt: new Date(),
    };

    await bookingsCollection.insertOne(
      booking
    );

    await schedulesCollection.updateOne(
      {
        _id: new ObjectId(flightId),
      },
      {
        $inc: { bookedSeats: 1 },
      }
    );

    return NextResponse.json({
      success: true,
      bookingReference,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create booking",
      },
      { status: 500 }
    );
  }
}