import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'

// Icon Link
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 inline-block text-gray-400 hover:text-primary-500 transition-colors">
    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
  </svg>
)

// Icon Công ty (Mới thêm)
const CompanyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm0 6h6v4H7v-4z" clipRule="evenodd" />
  </svg>
)

export const metadata = genPageMetadata({ title: 'Projects' })

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
          <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 md:ml-4 space-y-10">
            
            {projectsData.map((d) => (
              <div key={d.title} className="relative pl-8 md:pl-10 group">
                
                {/* Timeline Dot */}
                <span className="absolute -left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-gray-900 dark:ring-gray-900">
                   <span className="h-2.5 w-2.5 rounded-full bg-primary-500 group-hover:scale-125 transition-transform duration-300"></span>
                </span>

                <div className="flex flex-col space-y-3">
                  
                  {/* === HEADER SECTION === */}
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                    {/* Dòng 1: Tên + Thời gian */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                        {d.href ? (
                          <a href={d.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            {d.title} <LinkIcon />
                          </a>
                        ) : (
                          d.title
                        )}
                      </h3>
                      <span className="text-base font-bold text-gray-700 dark:text-gray-300 font-mono whitespace-nowrap">
                        {d.period}
                      </span>
                    </div>

                    {/* Dòng 2: Role + Company (Đã sửa style Company) */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-600 dark:text-gray-400 mt-2 gap-2">
                      <div className="w-full sm:w-auto">
                        <span className="font-semibold text-primary-600 dark:text-primary-400 text-lg">
                            {d.role}
                        </span>
                        {d.teamSize && (
                           <span className="text-sm ml-2 text-gray-500">(Team size: {d.teamSize})</span>
                        )}
                      </div>
                      
                      {/* --- STYLE CÔNG TY MỚI --- */}
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 w-fit sm:ml-auto">
                        <CompanyIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                            {d.company}
                        </span>
                      </div>
                      {/* ------------------------- */}

                    </div>
                  </div>

                  {/* === CONTENT SECTION === */}
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-500 dark:text-gray-400 text-base leading-relaxed marker:text-gray-400">
                    {Array.isArray(d.description) ? (
                      d.description.map((desc, index) => (
                        <li key={index} className="pl-1">{desc}</li>
                      ))
                    ) : (
                      <li>{d.description}</li>
                    )}
                  </ul>

                  {/* Tech Stack */}
                  <div>
                    <div className="inline-flex flex-wrap gap-2 mt-1">
                        {d.techStack.map((tech) => (
                        <span 
                            key={tech} 
                            className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-colors cursor-default"
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
  )
}