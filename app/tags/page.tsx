import Link from '@/components/Link';
import { slug } from 'github-slugger';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';
import { getTagClassName } from '@/helpers/tag-style.helper';

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
});

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 pt-6 pb-8 text-center md:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
          Tags
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Browse posts by topics and categories.
        </p>
      </div>

      {/* Tags Container */}
      <div className="flex justify-center">
        {/* Giới hạn max-width của cụm Tags để không dàn trải hết màn hình */}
        <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-wrap justify-center gap-3">
            {tagKeys.length === 0 && (
              <div className="w-full text-center text-sm text-gray-500">
                No tags found.
              </div>
            )}
            {sortedTags.map((t) => {
              return (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className={`group whitespace-nowrap transition-all hover:scale-105 active:scale-95 ${getTagClassName(t)}`}
                >
                  <span className="tracking-wide uppercase">{t}</span>
                  <span className="ml-2 flex items-center justify-center border-l border-current/20 pl-2 text-[10px] font-bold opacity-70">
                    {tagCounts[t]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer gợi ý nhỏ */}
      <div className="mx-auto mt-8 max-w-3xl border-t border-gray-100 pt-4 text-center dark:border-gray-800">
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Total {tagKeys.length} topics identified.
        </p>
      </div>
    </div>
  );
}
