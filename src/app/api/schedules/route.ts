import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("airlineDB");

    const schedules = await db
      .collection("schedules")
      .find({})
      .toArray();

    return NextResponse.json(schedules);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}