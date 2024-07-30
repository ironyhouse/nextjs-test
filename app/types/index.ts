export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  content: string | null;
  author: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
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
