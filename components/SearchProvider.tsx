'use client';

import { KBarSearchProvider } from 'pliny/search/KBar';
import { useRouter } from 'next/navigation';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Blog } from 'contentlayer/generated';

const basePath = process.env.BASE_PATH || '';

export const SearchProvider = ({ children }) => {
  const router = useRouter();

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: `${basePath}/search.json`,
        defaultActions: [
          {
            id: 'home-page-action',
            name: 'Home',
            keywords: 'trang chu home index',
            shortcut: ['h'],
            section: 'Navigation',
            perform: () => router.push('/'),
          },
          {
            id: 'blog-page-action',
            name: 'Blog',
            keywords: 'posts bài viết',
            shortcut: ['b'],
            section: 'Navigation',
            perform: () => router.push('/blog'),
          },
          {
            id: 'projects-page-action',
            name: 'Projects',
            keywords: 'du an projects work',
            shortcut: ['p'],
            section: 'Navigation',
            perform: () => router.push('/projects'),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: CoreContent<Blog>) => ({
            id: post.path,
            name: post.title,
            keywords: post?.summary || '',
            section: 'Blog Posts',
            subtitle: post.tags?.join(', ') || '',
            perform: () => router.push('/' + post.path),
          }));
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  );
};
