import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const bookingReference =
      searchParams.get("bookingReference");

    await client.connect();

    const db = client.db("airlineDB");

    const booking = await db
      .collection("bookings")
      .findOne({
        bookingReference,
      });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}