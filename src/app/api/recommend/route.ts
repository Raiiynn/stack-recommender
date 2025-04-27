import { NextRequest, NextResponse } from 'next/server';
import { recommendStack } from '@/lib/recommend';
import { connectDB } from '@/services/db';
import { Recommendation } from '@/services/recommendation';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const recommendation = await recommendStack(prompt);

    await connectDB(); // connect MongoDB
    await Recommendation.create({ prompt, recommendation }); // save to DB

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get recommendation' }, { status: 500 });
  }
}
