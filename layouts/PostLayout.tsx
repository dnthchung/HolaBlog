import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import SidebarTOC from '@/components/SidebarTOC';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import type { Authors, Blog } from 'contentlayer/generated';
import { CoreContent } from 'pliny/utils/contentlayer';
import { ReactNode } from 'react';

const editUrl = (path: string) =>
  `${siteMetadata.siteRepo}/blob/main/data/${path}`;
const discussUrl = (path: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Top header (GitHub-ish) */}
        <header className="mt-6">
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <PageTitle>
                  <span className="block">{title}</span>
                </PageTitle>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <time
                    dateTime={date}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {new Date(date).toLocaleDateString(
                      siteMetadata.locale,
                      postDateTemplate,
                    )}
                  </time>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <div className="flex flex-wrap gap-2">
                    {authorDetails.map((author) => (
                      <div
                        key={author.name}
                        className="inline-flex items-center gap-2"
                      >
                        {author.avatar ? (
                          <Image
                            src={author.avatar}
                            width={24}
                            height={24}
                            alt="avatar"
                            className="h-6 w-6 rounded-full"
                          />
                        ) : null}
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {author.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Header actions */}
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Link
                  href={editUrl(filePath)}
                  className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900"
                >
                  View on GitHub
                </Link>
                <Link
                  href={discussUrl(path)}
                  rel="nofollow"
                  className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900"
                >
                  Discuss
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main grid: content + sidebar */}
        <div className="mt-6 grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-[1fr_320px]">
          {/* Main content card */}
          <main className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
              {/* Bài viết chính */}
              <div className="prose dark:prose-invert max-w-none px-4 py-6 sm:px-6">
                {children}
              </div>

              {/* === MOVED "ABOUT" SECTION HERE === */}
              {/* Đặt vào giữa bài viết và footer, dùng border-t để ngăn cách */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-gray-800">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Cột 1: Authors & Tags */}
                  <div className="space-y-6">
                    {/* Authors */}
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Authors
                      </div>
                      <ul className="mt-2 space-y-2">
                        {authorDetails.map((author) => (
                          <li
                            key={author.name}
                            className="flex items-center gap-3"
                          >
                            {author.avatar ? (
                              <Image
                                src={author.avatar}
                                width={32}
                                height={32}
                                alt="avatar"
                                className="h-8 w-8 rounded-full"
                              />
                            ) : null}
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                {author.name}
                              </div>
                              {author.twitter ? (
                                <Link
                                  href={author.twitter}
                                  className="text-xs text-gray-600 hover:underline dark:text-gray-300"
                                >
                                  {author.twitter
                                    .replace('https://twitter.com/', '@')
                                    .replace('https://x.com/', '@')}
                                </Link>
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    {tags?.length ? (
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Topics
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Cột 2: Navigation */}
                  <div>
                    {prev?.path || next?.path ? (
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Navigation
                        </div>
                        <div className="mt-2 space-y-2">
                          {prev?.path ? (
                            <Link
                              href={`/${prev.path}`}
                              className="block rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Previous
                              </div>
                              <div className="line-clamp-2 font-medium">
                                {prev.title}
                              </div>
                            </Link>
                          ) : null}
                          {next?.path ? (
                            <Link
                              href={`/${next.path}`}
                              className="block rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Next
                              </div>
                              <div className="line-clamp-2 font-medium">
                                {next.title}
                              </div>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* === END MOVED SECTION === */}

              {/* Footer toolbar */}
              <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Link
                    href={editUrl(filePath)}
                    className="text-gray-700 hover:underline dark:text-gray-200"
                  >
                    Edit this page
                  </Link>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <Link
                    href={discussUrl(path)}
                    rel="nofollow"
                    className="text-gray-700 hover:underline dark:text-gray-200"
                  >
                    Discuss
                  </Link>
                </div>
                <Link
                  href={`/${basePath}`}
                  className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-200"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </div>

            {/* Comments */}
            {siteMetadata.comments ? (
              <div
                id="comment"
                className="mt-6 rounded-lg border border-gray-200 bg-white px-4 py-6 sm:px-6 dark:border-gray-800 dark:bg-gray-950"
              >
                <Comments slug={slug} />
              </div>
            ) : null}
          </main>

          {/* Right sidebar - ONLY Table of Contents */}
          <aside className="scrollbar-none pb-8 lg:sticky lg:top-32 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
            {content.toc && content.toc.length > 0 && (
              <SidebarTOC toc={content.toc} />
            )}
          </aside>
        </div>
      </article>
    </SectionContainer>
  );
}
