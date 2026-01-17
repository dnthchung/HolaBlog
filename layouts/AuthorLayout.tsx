import { ReactNode } from 'react';
import type { Authors } from 'contentlayer/generated';
import SocialIcon from '@/components/social-icons';
import Image from '@/components/Image';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    bluesky,
    linkedin,
    github,
  } = content;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header gọn gàng */}
      <div className="flex flex-col gap-2 pt-6 pb-8 md:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
          About
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
        {/* Sidebar: Profile Info (GitHub Style) */}
        <aside className="lg:col-span-1">
          <div className="flex flex-col items-center lg:items-center">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
                priority
              />
            )}
            <div className="mt-4 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {name}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {occupation}
              </p>

              <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-4 w-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {company}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-4 w-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {email}
                </div>
              </div>

              {/* Social Buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <SocialIcon kind="github" href={github} size={6} />
                <SocialIcon kind="linkedin" href={linkedin} size={6} />
                <SocialIcon kind="bluesky" href={bluesky} size={6} />
                <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Box */}
        <main className="lg:col-span-3">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/30">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                README.md
              </span>
            </div>
            <div className="prose dark:prose-invert max-w-none px-6 py-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
