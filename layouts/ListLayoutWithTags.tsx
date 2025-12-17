'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const btnBase =
    'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium ' +
    'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 ' +
    'dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900'
  const btnDisabled = 'cursor-not-allowed opacity-50 hover:bg-white dark:hover:bg-gray-950'

  return (
    <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
      <nav className="flex items-center justify-between">
        {!prevPage ? (
          <button className={`${btnBase} ${btnDisabled}`} disabled>
            Previous
          </button>
        ) : (
          <Link
            className={btnBase}
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page <span className="font-semibold text-gray-700 dark:text-gray-200">{currentPage}</span>{' '}
          of <span className="font-semibold text-gray-700 dark:text-gray-200">{totalPages}</span>
        </span>

        {!nextPage ? (
          <button className={`${btnBase} ${btnDisabled}`} disabled>
            Next
          </button>
        ) : (
          <Link className={btnBase} href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const selectedTag = pathname.includes('/tags/')
    ? decodeURI(pathname.split('/tags/')[1] || '')
    : null

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <div className="mt-6 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>

        {/* optional search placeholder giống GitHub */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
            <span className="select-none">Type</span>
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              /
            </kbd>
            <span className="select-none">to search</span>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar (Tags) */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              {pathname.startsWith('/blog') ? (
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  All Posts{' '}
                  <span className="text-gray-500 dark:text-gray-400">({posts.length})</span>
                </div>
              ) : (
                <Link
                  href="/blog"
                  className="hover:text-primary-500 dark:hover:text-primary-500 text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  All Posts{' '}
                  <span className="text-gray-500 dark:text-gray-400">({posts.length})</span>
                </Link>
              )}
            </div>

            <ul className="max-h-[70vh] overflow-auto p-2">
              {sortedTags.map((t) => {
                const isActive = selectedTag === slug(t)

                return (
                  <li key={t}>
                    <Link
                      href={`/tags/${slug(t)}`}
                      aria-label={`View posts tagged ${t}`}
                      className={[
                        'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                        'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900',
                        isActive
                          ? 'bg-gray-50 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                          : 'font-medium',
                      ].join(' ')}
                    >
                      <span className="truncate tracking-wide uppercase">{t}</span>
                      <span className="ml-3 inline-flex min-w-8 justify-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                        {tagCounts[t]}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Main list */}
        <main>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post

                return (
                  <li key={path} className="px-4 py-4 sm:px-6">
                    <article className="group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
                            <Link
                              href={`/${path}`}
                              className="hover:underline"
                              // GitHub vibe: underline on hover, not color shift
                            >
                              {title}
                            </Link>
                          </h2>

                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <time
                              dateTime={date}
                              suppressHydrationWarning
                              className="text-xs text-gray-500 dark:text-gray-400"
                            >
                              {formatDate(date, siteMetadata.locale)}
                            </time>

                            {tags?.length ? (
                              <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* right meta placeholder (optional) */}
                        <div className="hidden shrink-0 items-center gap-2 text-xs text-gray-500 sm:flex dark:text-gray-400">
                          <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 dark:border-gray-800 dark:bg-gray-900">
                            Post
                          </span>
                        </div>
                      </div>

                      {summary ? (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                          {summary}
                        </p>
                      ) : null}
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>

          {pagination && pagination.totalPages > 1 ? (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          ) : null}
        </main>
      </div>
    </div>
  )
}
