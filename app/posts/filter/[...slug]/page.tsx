import { fetchPosts } from '@/lib/api';

import PostsClient from './Posts.client';
import { Metadata } from 'next';

type generateMetadataProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const userId: string = slug[0];

  return {
    title: `Posts - ${userId === 'All' ? 'All Users' : userId}`,
    description: `Browse posts tagged with ${
      userId === 'All' ? 'all users' : userId
    }. Postly helps you filter and explore posts based on topics that matter to you.`,
  };
}

export default async function PostsPage({ params }: generateMetadataProps) {
  const { slug } = await params;
  const userId: string = slug[0];

  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });

  return <PostsClient initialData={data} userId={userId} />;
}
