import { NextRequest } from 'next/server';
import { Pokemon } from '@/app/types';

// The following code is provided as an example of an alternative data fetching method in Next.js
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#examples
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');

  if (!name) {
    console.error('Name was not provided.');
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      // need to disable cache in get method
      // https://nextjs.org/docs/app/building-your-application/routing/route-handlers#behavior
      cache: 'no-store',
    });

    if (!resp.ok) {
      throw new Error(
        `Failed to fetch pokemon data! Status: ${resp.status}, StatusText: ${resp.statusText}`
      );
    }

    const data: Pokemon = await resp.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      (error as Error)?.message || 'Failed to fetch pokemon data!';

    console.error('Error fetching Pokemon data:', error);

    return Response.json({ message: errorMessage }, { status: 500 });
  }
}
