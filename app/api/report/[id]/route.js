import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PATCH(request, context) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const { reunited } = await request.json();
    const client = await clientPromise;
    const db = client.db("petconnect");

    await db.collection("reports").updateOne(
      { _id: new ObjectId(id) },
      { $set: { reunited: reunited } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH /api/report/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
