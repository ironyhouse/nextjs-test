import Link from "next/link";
import { Props, Character } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Server-Side Rendering (SSR)
// Use SWAPI (https://swapi.dev) to fetch character data by ID.

// Simple SSR component implementation without extra logic

// Next.js automatically caches the returned values of fetch
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data
// To avoid this, we can use the following methods
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching

const getCharacterById = async (id: string) => {
  console.log(
    `Fetching people character by id: ${id} at ${new Date().toISOString()}`,
  );

  try {
    const response = await fetch(`${process.env.SSR_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch character data! Status: ${response.status}, StatusText: ${response.statusText}`,
      );
    }

    const data: Character = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
};

export default async function CharacterPage(props: {
  params: { id: string };
  searchParams: Props;
}) {
  const id = props.params.id;

  const character = await getCharacterById(id);

  if (!character)
    return <div>Error loading person. Please provide a correct person ID.</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="w-auto">
        <Link className="w-full" href="/">
          Home
        </Link>
      </Button>

      <Card className="flex flex-col gap-4 p-4 shadow-md">
        <Label>
          <h2 className="text-2xl font-bold">{character.name}</h2>
        </Label>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>
      </Card>
    </div>
  );
}
