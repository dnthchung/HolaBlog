import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';
// import NewsletterForm from 'pliny/ui/NewsletterForm';
import NewsletterForm from '@/components/NewsletterForm';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2 pt-6 pb-8 md:pt-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
            Latest Updates
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {/* Main List - GitHub Styled Container */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {!posts.length && (
              <li className="p-6 text-center text-gray-500">No posts found.</li>
            )}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post;
              return (
                <li key={slug} className="px-4 py-5 sm:px-6">
                  <article className="group">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Title & Date */}
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
                          <Link
                            href={`/blog/${slug}`}
                            className="hover:underline"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-1">
                          <time
                            dateTime={date}
                            className="text-xs text-gray-500 dark:text-gray-400"
                          >
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </div>
                      </div>

                      {/* Right: Tags (Meta Section) */}
                      <div className="hidden shrink-0 items-center gap-2 sm:flex">
                        {tags?.length > 0 ? (
                          <div className="flex flex-wrap justify-end gap-1.5">
                            {tags.slice(0, 2).map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        ) : (
                          <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                            Post
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    {summary && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {summary}
                      </p>
                    )}

                    {/* Footer link */}
                    <div className="mt-4">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm font-medium transition-all duration-200 hover:gap-2"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Navigation / Newsletter */}
        <div className="mt-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900"
              aria-label="All posts"
            >
              View all posts &rarr;
            </Link>
          )}

          {siteMetadata.newsletter?.provider && (
            <div className="w-full max-w-xs">
              <NewsletterForm />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
