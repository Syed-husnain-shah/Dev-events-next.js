import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import eventsData from "@/lib/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const event = await Event.findOne({ slug }).lean();
      if (event) {
        return NextResponse.json({ event }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Failed to fetch event from MongoDB:", error);
  }

  // Fallback to static constants
  const event = eventsData.find((item) => item.slug === slug);

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json({ event }, { status: 200 });
}
