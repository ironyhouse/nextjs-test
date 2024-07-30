import Link from 'next/link';
import { Props, Post } from '@/app/types';
import { Button } from '@/components/ui/button';

// Static Site Generation (SSG)
// Use https://jsonplaceholder.typicode.com API to fetch post data by ID.

const getPostById = async (id: string) => {
  console.log(`Fetching post by id: ${id} at ${new Date().toISOString()}`);

  try {
    const response = await fetch(`${process.env.SSG_BASE_URL}/${id}`);

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Post:', error);
    return null;
  }
};

export const dynamicParams = true;

// Generate static parameters for last 10 posts
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#generate-only-a-subset-of-params
export async function generateStaticParams() {
  const response = await fetch(`${process.env.SSG_BASE_URL}`);
  const posts: Post[] = await response.json();

  // Unfortunately, in the current implementation, we cannot fetch the latest 10 posts
  // Because posts do not have createdAt dates
  // So as a workaround we will select the last 10 posts from the array
  const lastPosts = posts.slice(-10);

  const paths = lastPosts.map((post) => ({ id: post.id.toString() }));
  return paths;
}

export default async function PostPage(props: {
  params: { id: string };
  searchParams: Props;
}) {
  const id = props.params.id;

  const post = await getPostById(id);

  if (!post) return <div>Error loading post. Please try again later.</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className='w-auto'>
        <Link className='w-full' href="/">Home</Link>
      </Button>
      <h1>SSG</h1>

      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>ID: {post.id}</p>
        <p>Created by: {post.userId}</p>
      </div>
    </div>
  );
}
