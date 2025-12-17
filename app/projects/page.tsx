import projectsData from '@/data/projectsData';
import { genPageMetadata } from 'app/seo';

// Icon Link
const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="hover:text-primary-500 ml-1 inline-block h-4 w-4 text-gray-400 transition-colors"
  >
    <path
      fillRule="evenodd"
      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon Công ty (Mới thêm)
const CompanyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm0 6h6v4H7v-4z"
      clipRule="evenodd"
    />
  </svg>
);

export const metadata = genPageMetadata({ title: 'Projects' });

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-12 dark:text-gray-100">
            Projects & Career Timeline
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my projects and professional experience.
          </p>
        </div>

        <div className="container py-8">
          <div className="relative ml-3 space-y-10 border-l-2 border-gray-200 md:ml-4 dark:border-gray-700">
            {projectsData.map((d) => (
              <div key={d.title} className="group relative pl-8 md:pl-10">
                {/* Timeline Dot */}
                <span className="absolute top-2 -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-gray-900 dark:ring-gray-900">
                  <span className="bg-primary-500 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"></span>
                </span>

                <div className="flex flex-col space-y-3">
                  {/* === HEADER SECTION === */}
                  <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
                    {/* Dòng 1: Tên + Thời gian */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-2xl leading-tight font-bold text-gray-900 dark:text-gray-100">
                        {d.href ? (
                          <a
                            href={d.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {d.title} <LinkIcon />
                          </a>
                        ) : (
                          d.title
                        )}
                      </h3>
                      <span className="font-mono text-base font-bold whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {d.period}
                      </span>
                    </div>

                    {/* Dòng 2: Role + Company (Đã sửa style Company) */}
                    <div className="mt-2 flex flex-col gap-2 text-gray-600 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
                      <div className="w-full sm:w-auto">
                        <span className="text-primary-600 dark:text-primary-400 text-lg font-semibold">
                          {d.role}
                        </span>
                        {d.teamSize && (
                          <span className="ml-2 text-sm text-gray-500">
                            (Team size: {d.teamSize})
                          </span>
                        )}
                      </div>

                      {/* --- STYLE CÔNG TY MỚI --- */}
                      <div className="flex w-fit items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-3 py-1 sm:ml-auto dark:border-slate-700 dark:bg-slate-800">
                        <CompanyIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-bold text-slate-700 sm:text-base dark:text-slate-200">
                          {d.company}
                        </span>
                      </div>
                      {/* ------------------------- */}
                    </div>
                  </div>

                  {/* === CONTENT SECTION === */}
                  <ul className="ml-4 list-outside list-disc space-y-1 text-base leading-relaxed text-gray-500 marker:text-gray-400 dark:text-gray-400">
                    {Array.isArray(d.description) ? (
                      d.description.map((desc, index) => (
                        <li key={index} className="pl-1">
                          {desc}
                        </li>
                      ))
                    ) : (
                      <li>{d.description}</li>
                    )}
                  </ul>

                  {/* Tech Stack */}
                  <div>
                    <div className="mt-1 inline-flex flex-wrap gap-2">
                      {d.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="hover:border-primary-400 cursor-default rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-sm text-gray-600 transition-colors dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400"
                        >
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
      </div>
    </>
  );
}
