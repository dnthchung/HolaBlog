'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TOCItem {
  value: string;
  url: string;
  depth: number;
}

interface Props {
  toc: TOCItem[];
}

const SidebarTOC = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState<string>('');
  const filteredToc = toc.filter((item) => item.depth <= 3);

  useEffect(() => {
    if (!filteredToc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0% 0% -80% 0%',
      },
    );

    filteredToc.forEach((item) => {
      const element = document.getElementById(item.url.slice(1));
      if (element) observer.observe(element);
    });

    return () => {
      filteredToc.forEach((item) => {
        const element = document.getElementById(item.url.slice(1));
        if (element) observer.unobserve(element);
      });
    };
  }, [filteredToc]);

  if (!filteredToc.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Table of Contents
        </h2>
      </div>

      <div className="px-4 py-4">
        <ul className="space-y-2">
          {filteredToc.map((item) => (
            <li
              key={item.url}
              style={{
                paddingLeft: `${(item.depth - 1) * 20}px`,
              }}
            >
              <Link
                href={item.url}
                className={`block text-sm transition-colors duration-200 ${
                  activeId === item.url.slice(1)
                    ? 'text-primary-500 font-medium'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.url.slice(1));
                  if (element) {
                    window.scrollTo({
                      top:
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        100,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {item.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarTOC;
