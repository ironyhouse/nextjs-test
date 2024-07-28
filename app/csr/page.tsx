'use client';

// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

import { useState, useEffect } from 'react';
import { Pokemon, Props } from '@/app/types/index';
import Image from 'next/image';
import Link from 'next/link';

export default function PokemonPage(props: Props) {
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
    <div>
      <Link href="/">Home</Link>
      <h1>Client-Side Rendering (CSR)</h1>

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            height={100}
            width={100}
            className="w-[200px] h-[200px]"
          />
        </div>
      )}
    </div>
  );
}
