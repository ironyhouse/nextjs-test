import { Props, Article } from '@/app/types';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Incremental Static Regeneration (ISR)
// Use https://newsapi.org API to fetch news data by category.
// This API will require you to create an account to get an API key.

const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const getNewsByCategory = async (category: string) => {
  console.log(
    `Fetching news for category: ${category} at ${new Date().toISOString()}`
  );

  try {
    const response = await fetch(
      `${process.env.ISR_BASE_URL}?country=us&category=${category}&apiKey=${process.env.ISR_NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching news for category ${category}! Status: ${response.status}, StatusText: ${response.statusText}`
      );
    }

    const { articles: data }: { articles: Article[] } = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
};

// return 404 for invalid parameters
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#generate-only-a-subset-of-params
export const dynamicParams = false;

// As an alternative, we can use - next: { revalidate: 3600 }
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
export const revalidate = 60;

// Generate static parameters for categories
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export default async function NewsPage(props: {
  params: { category: string };
  searchParams: Props;
}) {
  const category = props.params?.category;

  const articles = await getNewsByCategory(category);

  if (!articles)
    return <div>Error loading articles. Please provide a correct category.</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="w-auto">
        <Link className="w-full" href="/">
          Home
        </Link>
      </Button>
      <h1>
        News Articles in {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <ArticleCard {...article} />
          </li>
        ))}
      </ul>
    </div>
  );
}
