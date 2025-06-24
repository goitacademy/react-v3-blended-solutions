import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';
import { Metadata } from 'next';

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const parsedId = Number(id);
  const post = await fetchPostById(parsedId);

  return {
    title: post.title,
    description: `${post.body.slice(0, 30)}...`,
  };
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { id } = await params;

  const parsedId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
