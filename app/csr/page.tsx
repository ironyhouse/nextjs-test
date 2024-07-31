'use client';

// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Pokemon, Props } from '@/app/types/index';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PokemonCard = dynamic(
  () =>
    import('@/components/PokemonCard/PokemonCard').then(
      (mod) => mod.PokemonCard
    ),
  { ssr: false }
);

export const PokemonPage = (props: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const name = Array.isArray(props?.searchParams?.name)
    ? props?.searchParams?.name[0]
    : props?.searchParams?.name;

  const fetchPokemon = async (name: string) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/pokemon?name=${name.toLowerCase()}`);

      if (!response.ok) {
        throw new Error('Pokemon not found');
      }

      const data: Pokemon = await response.json();

      setPokemon(data);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchPokemon(name);
    }
  }, [name]);

  if (!name) return <div>Please provide a Pokemon name.</div>;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="w-auto">
        <Link className="w-full" href="/">
          Home
        </Link>
      </Button>
      <h1>Client-Side Rendering (CSR)</h1>

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default dynamic(
  () => import('@/app/csr/page').then((mod) => mod.PokemonPage),
  { ssr: false }
);
