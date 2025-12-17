import Link from '@/components/Link';
import { slug } from 'github-slugger';
import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
});

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>

        {/* SỬA PHẦN NÀY: Dùng flex-wrap và gap để căn chỉnh đẹp hơn */}
        <div className="flex max-w-lg flex-wrap gap-3">
          {tagKeys.length === 0 && 'No tags found.'}

          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                // Copy style từ component Tag của bạn, nhưng điều chỉnh padding để chứa cả số lượng
                className="group inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800"
              >
                {/* Tên Tag */}
                <span className="uppercase">{t}</span>

                {/* Số lượng - Hiển thị như một badge nhỏ bên trong */}
                <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gray-200 px-1 text-xs text-gray-600 group-hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700">
                  {tagCounts[t]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
