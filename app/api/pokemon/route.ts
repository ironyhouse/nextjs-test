import { NextRequest, NextResponse } from 'next/server';
import { Pokemon } from '@/app/types';

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');

  if (!name) {
    console.error('Name was not provided.');
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      cache: 'no-store',
      method: 'GET',
    });

    if (!resp.ok) {
      throw new Error(
        `Failed to fetch pokemon data! Status: ${resp.status}, StatusText: ${resp.statusText}`
      );
    }

    const data: Pokemon = await resp.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      (error as Error)?.message || 'Failed to fetch Pokemon data!';
    console.error('Error fetching Pokemon data:', error);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
