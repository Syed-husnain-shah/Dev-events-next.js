import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import eventsData from "@/lib/constants";

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const events = await Event.find().lean();
      if (events && events.length > 0) {
        return NextResponse.json({ events }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Failed to fetch events from MongoDB:", error);
  }

  // Fallback to static constants if database is not configured or empty
  return NextResponse.json({ events: eventsData }, { status: 200 });
}
