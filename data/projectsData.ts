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
    title: 'PSMS',
    role: 'Frontend Developer',
    company: 'HBLab JSC',
    period: '02/2026 -- now',
    description: [
      'Warehouse outbound management system for marketing material distribution, including picking, packing, scan-based verification, shipment completion, labeling, and Excel/FTP integration.',
      'Built for a Japanese client.',
    ],
    responsibilities: [
      "Built all 10 master-data CRUD modules (areas, centers, clients, materials, operators, patterns, stores, users, roles, deliveries) on Next.js 16 App Router using the team's shared Atomic Design + shadcn/ui component library.",
      'Authored Zod schemas and React Hook Form forms for each master entity, plus shared filter, sort, pagination, and URL-query-state patterns across list screens.',
      'Contributed UI components and fixes to the Plan import module (Excel preview with center x material matrix) owned by senior teammates.',
      "Used Claude as an AI pair-programming agent for Figma to React component generation, code review and refactor suggestions, and cross-checking implementations against BA's Basic Design documents.",
    ],
    techStack: {
      Tech: 'Next.js 16, React 19, TypeScript, Zustand, TanStack Query, React Hook Form, Zod, Tailwind CSS v4, shadcn/ui, Axios, Atomic Design, Claude',
    },
    teamSize: 9,
  },
  {
    title: 'HQ-Order',
    role: 'Frontend Developer',
    company: 'HBLab JSC',
    period: '10/2025 -- 03/2026',
    description: [
      'Renewal of back-office order tools for a Japanese retail chain, covering spreadsheet-style order entry, matrix conversion, Excel/CSV import-export, history, and pre-vendor approval.',
      "Rebuilt on the client's Shinise architecture (gRPC, GraphQL).",
    ],
    responsibilities: [
      'Rebuilt 2 legacy jQuery/Handsontable tools (7,800+ LOC) on Angular 17 standalone and Signals; reached parity in sprint 1, then shipped new features per Jira backlog.',
      'Built a typed HttpClient and AuthInterceptor with OAuth/OIDC and 401-retry refresh-token flow, removing the legacy redirect-to-login UX cliff on token expiry.',
      'Centralized 40+ Reactive-Form validators (JAN, quantity, delivery date, lot/case) in a shared lib; retained Handsontable to preserve back-office keyboard workflow.',
      'Integrated 14+ REST endpoints plus SheetJS-based Excel/CSV import-export with unified error mapping.',
    ],
    techStack: {
      Tech: 'Angular 20, TypeScript, RxJS, Signals, Reactive Forms, PrimeNG, Handsontable, SheetJS, OAuth/OIDC, Docker, Cloud Run, GitHub, Jira',
    },
    teamSize: 11,
  },
  {
    title: 'KJ Phase 2',
    role: 'Frontend Developer',
    company: 'HBLab JSC',
    period: '07/2025 -- 11/2025',
    description: [
      'Added a Proficiency Test module to an existing educational platform for Japanese cargo-transport operations certification.',
      'Admin web for managing tests, questions and test users; user web for taking the test, viewing results and explanations.',
    ],
    responsibilities: [
      'Shipped 15 admin + 6 user screens (~ 43 REST endpoints) for a new Proficiency Test module on an existing Next.js educational platform.',
      'Built the exam-taking flow with timer, save-and-resume, and a polling guard that detects admin-edited-mid-exam via HTTP 409 and safely kicks the user instead of submitting stale answers.',
      'Implemented Excel bulk-question upload with preview-before-commit and multi-mode question forms (single / multi sub-question with up to 10 choices), backed by AntD validators with cross-field re-validation.',
      'Designed the result, history and explanation screens with per-category pass/fail breakdown driven by require_correct_amount, and handled the 35-case user x test active-period matrix gating the start screen per the basic design document.',
    ],
    techStack: {
      Tech: 'Next.js 13, React 18, TypeScript, Redux Toolkit, Redux Saga, Ant Design, Tailwind CSS, next-translate, axios, moment-timezone, Docker',
    },
    teamSize: 9,
  },
  {
    title: 'IPCC 2.0',
    role: 'Frontend Developer',
    company: 'Fint',
    period: '10/2024 -- 12/2024',
    description: [
      'A telecommunications contact center platform for Viettel, integrating SMS, Email, and Chat for customer support services.',
    ],
    responsibilities: [
      'Implemented SMS and Email campaign management screens (list, create/edit form, recipient selection) based on Figma designs.',
      'Integrated REST APIs via Angular HttpClient and RxJS to display campaign status, delivery progress, and message history in tables and detail views.',
      'Built Reactive Forms validation, filter, search and pagination for campaign and recipient lists using ng-zorro-antd components.',
    ],
    techStack: {
      Tech: 'Angular 17, TypeScript, RxJS, REST API, ng-zorro-antd',
    },
    teamSize: 30,
  },
  {
    title: 'Smart Motor',
    role: 'Frontend Developer',
    company: 'Fint',
    period: '06/2024 -- 11/2024',
    description: [
      "A smart vehicle tracking and management service utilizing Viettel's mobile network and GPS for real-time positioning, trip history, and remote anti-theft protection.",
    ],
    responsibilities: [
      'Developed the SIM product management screens (list, activate/suspend, bulk CSV upload) for telecom subscriptions linked to IoT vehicle tracking devices.',
      'Built vehicle operation flows including ownership transfer, remote engine lock/unlock, and async operation status tracking with WebSocket-driven UI updates.',
      'Built reusable data-table, form, and validation layers (filter, sort, paginate) for complex fleet management screens.',
    ],
    techStack: {
      Tech: 'React 18, TypeScript, Redux Toolkit, React Query, REST API, WebSocket, Ant Design',
    },
    teamSize: 10,
  },
  {
    title: 'Quality Assessment System',
    role: 'Backend & Frontend',
    company: 'Fint',
    period: '01/2025 -- 04/2025',
    description: [
      'An internal quality control platform for insurance companies to monitor claim processing standards and mitigate operational risks.',
    ],
    responsibilities: [
      'Maintained legacy backend modules, fixed production issues, and updated business logic for insurance claim validation based on customer change requests.',
      'Developed and customized interactive data visualizations using Chart.js, tailoring charts and metrics to meet specific stakeholder requirements.',
      'Collaborated with the QA team to implement new business rules for fraud detection and automated performance reporting in PDF/Excel formats.',
    ],
    techStack: {
      Tech: 'Java 11, Spring Boot, MySQL, AngularJS, Chart.js, RESTful API',
    },
    teamSize: 15,
  },
];

export default projectsData;
