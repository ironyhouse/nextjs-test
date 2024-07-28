export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}
export type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
