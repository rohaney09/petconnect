import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db("petconnect");

    // Insert the report
    const result = await db.collection("reports").insertOne(data);

    // Matching logic 
    const oppositeType = data.type === "Lost" ? "Found" : "Lost";

    const matches = await db.collection("reports").find({
      type: oppositeType,
      location: { $regex: new RegExp(data.location, "i") },
      petName: { $regex: new RegExp(data.petName, "i") },
    }).toArray();

    return NextResponse.json({ success: true, id: result.insertedId, matches });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all reports
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("petconnect");
    const reports = await db.collection("reports").find({}).toArray();
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
