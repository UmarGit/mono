import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Mono - Bionic Reading Editor',
    },
    { status: 200 }
  );
}
