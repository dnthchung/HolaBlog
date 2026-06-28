interface TechStack {
  Tech?: string;
  Architecture?: string;
  Backend?: string;
  Frontend?: string;
  Database?: string;
  Infrastructure?: string;
  Messaging?: string;
  'Real-time'?: string;
  Cloud?: string;
  Patterns?: string;
  'ORM / ODM'?: string;
  DevOps?: string;
}

interface Project {
  title: string;
  role: string;
  company: string;
  period: string;
  description: string[]; // Dùng để mô tả dự án đó là gì
  responsibilities?: string[]; // <--- THÊM TRƯỜNG NÀY: Mô tả bạn đã làm gì
  techStack: TechStack;
  teamSize?: number;
  isCapstone?: boolean;
  href?: string;
}

const projectsData: Project[] = [
  {
    title: 'Sidecar DataOps Platform',
    role: 'Backend Developer',
    company: 'HBLab JSC',
    period: '06/2025 -- now',
    description: [
      'Consolidated DataOps platform for lean data teams, providing data quality monitoring, metadata cataloging, data lineage tracking, governance, and pipeline observability across enterprise data warehouses.',
    ],
    responsibilities: [
      'Built RESTful APIs with NestJS for managing data sources, metadata catalogs, data quality rules, pipeline executions, and observability metrics.',
      'Developed asynchronous task pipelines using BullMQ and Redis to process data quality checks, catalog refreshes, and lineage updates.',
      'Implemented scheduled background jobs with distributed locking and idempotency mechanisms to prevent duplicate pipeline executions.',
      'Integrated webhook-driven workflows with Jira and Backlog to auto trigger pipeline jobs from ticket and message events.',
    ],
    techStack: {
      Tech: 'NestJS, BullMQ, Redis, PostgreSQL, TypeORM, REST API, Webhook, Docker',
    },
    teamSize: 7,
  },
  {
    title: 'PSMS',
    role: 'Backend Developer',
    company: 'HBLab JSC',
    period: '02/2026 -- now',
    description: [
      'Warehouse outbound management system for marketing material distribution — picking, packing, scan-based verification, shipment completion, labeling, and Excel/FTP integration.',
    ],
    responsibilities: [
      'Built REST APIs for Supplies Master and Stock Adjustment with transaction management and Redis caching.',
      'Developed inventory configuration features for order thresholds, schedules, and store groups.',
      'Developed order calculation logic based on business requirements and Detail Design documents.',
      'Used Claude Code to support Basic Design, Detail Design, and code generation.',
    ],
    techStack: {
      Tech: 'NestJS, TypeORM, Better Auth, PostgreSQL, Redis, GCP, GitLab CI/CD, Docker, SonarQube, Sentry',
    },
    teamSize: 9,
  },
  {
    title: 'Kojiro System',
    role: 'Fullstack Developer',
    company: 'HBLab JSC',
    period: '07/2025 -- 11/2025',
    description: [
      'Added a Proficiency Test module and digital content management to an existing educational platform for Japanese cargo-transport certification. Admin web for managing tests, questions and users; user web for taking tests, viewing results and explanations.',
    ],
    responsibilities: [
      'Built REST APIs for driving-theory exercises, plus Media and Notification services for video content, study reminders, and exam alerts.',
      'Implemented RabbitMQ async event handling and Redis caching for frequently accessed categories and questions.',
      'Shipped admin & user screens, including exam flow with timer, save/resume, and conflict handling for mid-exam updates.',
      'Built Excel bulk-question upload with preview, multi-mode question forms, and AntD cross-field validation.',
      'Developed result, history, and explanation screens with category-based pass/fail logic and start-screen eligibility checks.',
      'Set up Axiom and Sentry for cross-stack performance monitoring and error tracking.',
    ],
    techStack: {
      Tech: 'Microservices, NestJS, TypeORM, PostgreSQL, Redis, RabbitMQ, Axiom/Sentry, Docker, Next.js 13, Redux Toolkit, Redux Saga, Ant Design',
    },
    teamSize: 9,
  },
  {
    title: 'Attendance & Payroll Management System',
    role: 'Frontend Developer',
    company: 'Fint',
    period: '04/2024 -- 08/2024',
    description: [
      'A multi-role HRM web application for managing employees, work schedules, attendance records, payroll, organizational structures, and branch memberships.',
    ],
    responsibilities: [
      'Developed employee, work schedule, attendance, and payroll management features for Admin, HR, and Employee portals.',
      'Implemented management screens with reusable & custom components using Tailwind CSS & Atomic Design.',
      'Integrated REST APIs with TanStack Query and Axios, handling data fetching, mutations, states, and cache invalidation.',
      'Implemented CRUD forms with React Hook Form and Zod for employee, attendance, and payroll workflows.',
    ],
    techStack: {
      Tech: 'React 18, Vite, React Router 7, TanStack Query, Zustand, React Hook Form, Zod, Axios, Tailwind CSS, i18next, Atomic design',
    },
    teamSize: 6,
  },
  {
    title: 'IPCC 2.0',
    role: 'Frontend Developer',
    company: 'Fint',
    period: '10/2024 -- 12/2024',
    description: [
      'A telecommunications contact center platform, integrating SMS, Email, and Chat for customer support services.',
    ],
    responsibilities: [
      'Built SMS/Email campaign management screens (list, create/edit form, recipient selection).',
      'Integrated REST APIs via HttpClient & RxJS for campaign status, delivery progress, message history.',
      'Implemented Reactive Forms validation, filter, search, pagination with ng-zorro-antd.',
    ],
    techStack: {
      Tech: 'Angular 20, TypeScript, RxJS, Signals, Reactive Forms, PrimeNG, Handsontable, SheetJS, OAuth/OIDC, ng-zorro-antd',
    },
    teamSize: 15,
  },
  {
    title: 'Smart Motors',
    role: 'Frontend Developer',
    company: 'Fint',
    period: '06/2024 -- 11/2024',
    description: [
      "A smart vehicle tracking and management service utilizing Viettel's mobile network and GPS for real-time positioning, trip history, and remote anti-theft protection.",
    ],
    responsibilities: [
      'Built SIM product management screens for telecom subscriptions linked to IoT tracking devices.',
      'Developed vehicle flows: ownership transfer, remote engine lock/unlock, WebSocket status tracking.',
      'Built reusable data-table, form & validation layers (filter, sort, paginate) for fleet screens.',
    ],
    techStack: {
      Tech: 'React 18, TypeScript, Redux Toolkit, React Query, REST API, WebSocket, Ant Design',
    },
    teamSize: 10,
  },
];

export default projectsData;
