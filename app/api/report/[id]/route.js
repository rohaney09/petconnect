import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
  try {
    const id = params?.id;
    if (!id) throw new Error("Missing ID in params");

    const { reunited } = await req.json();
    const client = await clientPromise;
    const db = client.db("petconnect");

    await db.collection("reports").updateOne(
      { _id: new ObjectId(id) },
      { $set: { reunited } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
