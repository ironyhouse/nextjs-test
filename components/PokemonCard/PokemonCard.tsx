import dynamic from 'next/dynamic';
import { Pokemon } from '@/app/types/index';
import Image from 'next/image';

type PokemonDetailsProps = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: PokemonDetailsProps) => {
  return (
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
  );
};

export default dynamic(
  () =>
    import('@/components/PokemonCard/PokemonCard').then(
      (mod) => mod.PokemonCard
    ),
  { ssr: false }
);
