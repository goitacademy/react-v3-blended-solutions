import { fetchPosts } from '@/lib/api';

import PostsClient from './Posts.client';

type PostsPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId: string = slug[0];

  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });

  return <PostsClient initialData={data} userId={userId} />;
}
