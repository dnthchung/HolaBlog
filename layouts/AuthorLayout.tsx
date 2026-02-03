import { ReactNode } from 'react';
import type { Authors } from 'contentlayer/generated';
import SocialIcon from '@/components/social-icons';
import Image from '@/components/Image';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

// Type definitions for achievements, education and career
interface Achievement {
  text: string;
  link?: string;
  linkText?: string;
}

interface Education {
  school: string;
  location?: string;
  degree: string;
  gpa: string;
  period: string;
  achievements: Achievement[];
}

interface Career {
  company: string;
  position: string;
  type: string;
  period: string;
  location: string;
  current: boolean;
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    phone,
    location,
    bluesky,
    linkedin,
    github,
    education,
    career,
  } = content as Omit<Authors, '_id' | '_raw' | 'body'> & {
    education?: Education[];
    career?: Career[];
    phone?: string;
    location?: string;
  };

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
          <div className="flex flex-col items-center lg:items-start">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full border border-gray-200 dark:border-gray-800"
                priority
              />
            )}
            <div className="mt-4 w-full text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {name}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {occupation}
              </p>

              <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                {/* Company */}
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

                {/* Location */}
                {location && (
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {location}
                  </div>
                )}

                {/* Phone */}
                {phone && (
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {phone}
                  </div>
                )}

                {/* Email */}
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
                  <a
                    href={`mailto:${email}`}
                    className="underline-offset-4 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                  >
                    {email}
                  </a>
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

          {/* Education & Career Section - Split 50/50 */}
          {(education || career) && (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Education Section */}
              {education && education.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Education
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className={`${index > 0 ? 'mt-4 border-t border-gray-100 pt-4 dark:border-gray-800' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {edu.school}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {edu.degree}
                            </p>
                          </div>
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {edu.gpa}
                          </span>
                        </div>
                        <p className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {edu.period}
                          </span>
                          {edu.location && (
                            <span className="flex items-center gap-1">
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {edu.location}
                            </span>
                          )}
                        </p>
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {edu.achievements.map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                                <span>
                                  {achievement.text}
                                  {achievement.link && (
                                    <a
                                      href={achievement.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-1 text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                      {achievement.linkText || '[link]'}
                                    </a>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Section */}
              {career && career.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Work Experience
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    {career.map((job, index) => (
                      <div
                        key={index}
                        className={`${index > 0 ? 'mt-4 border-t border-gray-100 pt-4 dark:border-gray-800' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {job.company}
                            </h3>
                            {job.current && (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {job.position} • {job.type}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {job.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {job.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
