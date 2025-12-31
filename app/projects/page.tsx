import projectsData from '@/data/projectsData';
import { genPageMetadata } from 'app/seo';
import { getTagClassName } from '@/helpers/tag-style.helper';
import { getCompanyColor } from '@/helpers/company-color.helper';

export const metadata = genPageMetadata({ title: 'Projects' });

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-2 pt-6 pb-8 md:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
          Projects & Career
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          My professional journey and technical contributions.
        </p>
      </div>

      <div className="relative ml-2 border-l border-gray-200 py-4 md:ml-4 dark:border-gray-800">
        {projectsData.map((d) => (
          <div key={d.title} className="group relative mb-12 pl-6 md:pl-8">
            {/* Timeline Dot */}
            <span className="absolute top-1.5 -left-[6.5px] flex h-3 w-3 items-center justify-center rounded-full border border-white bg-gray-200 dark:border-gray-950 dark:bg-gray-700">
              <span className="group-hover:bg-primary-500 h-1.5 w-1.5 rounded-full bg-gray-400 transition-colors"></span>
            </span>

            {/* Mốc thời gian nổi bật (GitHub Label Style) */}
            <div className="mb-3 inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-bold tracking-tight text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              <svg
                className="mr-1.5 h-3 w-3 text-gray-400"
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
              {d.period}
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
              <div className="border-b border-gray-100 bg-gray-50/30 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {d.title}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                        {d.role}
                      </span>
                      {d.teamSize && (
                        <span className="text-[11px] font-medium text-gray-400 italic">
                          (Team: {d.teamSize})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-800 dark:bg-gray-900">
                    <div
                      className={`h-2 w-2 animate-pulse rounded-full ${getCompanyColor(d.company)}`}
                    />{' '}
                    {/* Status dot */}
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {d.company}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4">
                {/* Phần 1: Mô tả dự án (Project Overview) */}
                <ul className="space-y-2">
                  {d.description.map((desc, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Phần 2: Vai trò/Công việc cụ thể (Responsibilities) - MỚI THÊM */}
                {d.responsibilities && d.responsibilities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-500">
                      Key Contributions:
                    </h4>
                    <ul className="border-primary-500/20 ml-1 space-y-1.5 border-l-2 pl-4">
                      {d.responsibilities.map((task, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-primary-500 mr-2">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Phần 3: Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {d.techStack.map((tech) => (
                    <span key={tech} className={getTagClassName(tech)}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
