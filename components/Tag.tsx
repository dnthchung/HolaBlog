import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-800"
    >
      {text}
    </Link>
  );
};

export default Tag;
