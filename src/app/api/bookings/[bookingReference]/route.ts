import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    const params =
      await context.params;

    await client.connect();

    const db = client.db("airlineDB");

    const bookingsCollection =
      db.collection("bookings");

    const schedulesCollection =
      db.collection("schedules");

    const bookingReference =
      params.bookingReference;

    const booking =
      await bookingsCollection.findOne({
        bookingReference,
      });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    await bookingsCollection.deleteOne({
      bookingReference,
    });

    await schedulesCollection.updateOne(
      {
        _id: booking.flightId,
      },
      {
        $inc: {
          bookedSeats: -1,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to cancel booking",
      },
      { status: 500 }
    );
  }
}