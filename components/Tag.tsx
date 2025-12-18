import Link from 'next/link';
import { slug } from 'github-slugger';
import { getTagClassName } from '@/helpers/tag-style.helper';

const Tag = ({ text }: { text: string }) => (
  <Link href={`/tags/${slug(text)}`} className={getTagClassName(text)}>
    {text}
  </Link>
);

export default Tag;
