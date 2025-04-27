import { NextRequest, NextResponse } from 'next/server';
import { recommendStack } from '@/services/groqService';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const recommendation = await recommendStack(prompt);

    return NextResponse.json({ recommendation });
    
  } catch (error: any) {
    console.error('Error in POST /recommend:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Failed to get recommendation' }, { status: 500 });
  }
}
