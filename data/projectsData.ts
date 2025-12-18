interface Project {
  title: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  techStack: string[];
  teamSize?: number;
  isCapstone?: boolean;
  href?: string;
  imgSrc?: string;
}

const projectsData = [
  {
    title: 'Kojiro System',
    role: 'Front-end',
    company: 'HBLab JSC',
    period: '08/2025 -- 12/2025',
    description: [
      'A webapp that allows users to buy clothes with full function of admin panel.',
      'Managed team tasks and oversaw the full development lifecycle.',
    ],
    techStack: ['NextJS v13', 'Redux Toolkit', 'Ant Design', 'Tailwind'],
    teamSize: 7,
  },
  {
    title: 'Student Care System',
    role: 'Front-end',
    company: 'FPT University',
    period: '01/2025 -- 05/2025',
    description: [
      'Developed a web-based platform for the Student Services Office at FPT University to efficiently manage student data, including attendance, grades, applications, and academic records.',
      'Integrated AI features to identify at-risk students, enabling staff to provide timely, data-driven interventions for improved student performance and well-being.',
    ],
    techStack: [
      'ReactJS v18',
      'TypeScript',
      'Ant Design',
      'Tailwind',
      'TanStack Query',
      'Zustand',
    ],
    href: 'https://j2c.cc/RDS_capstone_project',
    teamSize: 5,
  },
  {
    title: 'Smart Attendance on School Bus',
    role: 'Front-end (Web & Mobile)',
    company: 'FPT Software',
    period: '05/2024 - 11/2024',
    description: [
      'Enabled automatic student check-in/out through integration with smart bus camera systems.',
      'Developed web admin panel (staff) and mobile app (parents, drivers, assistants).',
      'Integrated live bus tracking and route monitoring for parents.',
    ],
    techStack: [
      'ReactJS v18',
      'Shadcn UI',
      'TanStack Router/Query',
      'Leaflet',
      'Zod',
      'Flutter',
      'Firebase',
    ],
    href: 'https://j2c.cc/bbus-capstone',
    teamSize: 6,
  },
  {
    title: 'DeutschNerd',
    role: 'Front-end & Back-end',
    company: 'FPT University',
    period: '08/2024 -- 12/2024',
    description: [
      'An online platform that helps users practice German through exercises and vocabulary learning via flashcards.',
      'Includes dashboards for roles such as admin, teacher, and supporter.',
    ],
    techStack: [
      'ReactJS v18',
      'ExpressJS v4',
      'Styled Components',
      'Ant Design',
      'Redux Toolkit',
    ],
    href: 'https://j2c.cc/RDS_DeutschNerd',
    teamSize: 5,
  },
  {
    title: 'HolaWear Shop',
    role: 'Front-end & Back-end - Team Lead',
    company: 'FPT University',
    period: '05/2024 -- 07/2024',
    description: [
      'A webapp that allows users to buy clothes with full function of admin panel.',
      'Managed team tasks and oversaw the full development lifecycle.',
    ],
    techStack: [
      'Vite',
      'ReactJS v18 (JavaScript)',
      'ExpressJS v4',
      'MongoDB',
      'Redux Toolkit',
      'Shadcn UI',
    ],
    href: 'https://github.com/dnthchung/HolaWear',
    teamSize: 5,
  },
  {
    title: 'Insurance Manage System',
    role: 'Full Stack Developer',
    company: 'FPT University',
    period: '09/2023 -- 12/2023',
    description: [
      'A web-based platform for managing insurance contracts.',
      'Features user registration and role-specific dashboards for sales representatives and administrators.',
    ],
    techStack: [
      'Java JDBC',
      'Servlet',
      'SQL Server',
      'Tomcat 10',
      'Bootstrap',
      'JSP',
    ],
    href: 'https://j2c.cc/Group5-InsuranceManageSystem',
    teamSize: 5,
  },
];

export default projectsData;
