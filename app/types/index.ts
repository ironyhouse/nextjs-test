export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
