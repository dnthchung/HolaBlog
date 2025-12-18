'use client';

import { KBarSearchProvider } from 'pliny/search/KBar';
import { useRouter } from 'next/navigation';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Blog } from 'contentlayer/generated';

export const SearchProvider = ({ children }) => {
  const router = useRouter();

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'home-page-action', // Thằng ID phải là duy nhất
            name: 'Home',
            keywords: 'trang chu home index',
            shortcut: ['h'], // Thay đổi thành 1 phím duy nhất để tránh lỗi render key 'h' hai lần
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
