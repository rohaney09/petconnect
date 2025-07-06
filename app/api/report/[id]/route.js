import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PATCH(request, context) {
  try {
    const id = context?.params?.id;

    // Validate ID
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing ID' },
        { status: 400 }
      );
    }

    const { reunited } = await request.json();

    // Validate payload
    if (typeof reunited !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Invalid reunited value. Must be boolean.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('petconnect');

    const result = await db.collection('reports').updateOne(
      { _id: new ObjectId(id) },
      { $set: { reunited } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Marked as reunited' });
  } catch (error) {
    console.error('PATCH /api/report/[id] error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
