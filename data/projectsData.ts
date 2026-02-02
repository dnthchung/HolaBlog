interface TechStack {
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
    title: 'YD Project',
    role: 'Back-end Developer',
    company: 'HBLab JSC',
    period: '10/2025 -- now',
    description: [
      'Automatic Supplies Ordering System.',
      'Implemented backend services for automated inventory and order processing systems serving 500+ stores.',
      'It generates orders based on sales and inventory data to reduce stock shortages and manual operations.',
    ],
    responsibilities: [
      'Developed REST APIs for Supplies Master with pagination, validation, and RBAC.',
      'Implemented inventory configuration features (order thresholds, schedules, store groups) that control when and how stores replenish stock.',
      'Implemented order calculation logic using different strategies based on sales data.',
      'Built Stock Adjustment APIs with event-driven processing and Redis caching.',
    ],
    techStack: {
      Architecture: 'Modular Monolith, Layered Architecture, DDD-lite',
      Backend:
        'Java 17, Spring Boot 3.2, Spring Security (JWT, RBAC), Spring Data JPA, Hibernate',
      Database: 'PostgreSQL 15, Flyway, Redis (ElastiCache)',
      Infrastructure:
        'AWS Fargate, Lambda (Python batch jobs), RDS, S3, CloudWatch, GitHub Actions',
      Patterns: 'Repository, Event-driven (Spring Events), Outbox Pattern',
    },
    teamSize: 7,
  },
  {
    title: 'KJ System (Kojiro 803)',
    role: 'Back-end Developer',
    company: 'HBLab JSC',
    period: '07/2025 -- 11/2025',
    description: [
      'An educational platform for Japanese users preparing for driving license theory exams.',
      'Multi-platform system with 5,000+ app downloads (Admin Web, User Web (Next.js), and Mobile App (React Native)).',
      'Supports 15+ modules such as practice exercises, mock exams, proficiency tests, video tutorials (up to 5GB), and a community Q&A board.',
    ],
    responsibilities: [
      'Developed REST APIs for driving theory exercises (Spring Boot) and digital content management (ExpressJS).',
      'Built Media Service endpoints to manage video metadata and learning content for Mobile clients.',
      'Built Notification Service APIs with RabbitMQ for study reminders and exam alerts.',
      'Implemented Kafka producers and consumers for events: user registration and exam completion.',
      'Added Redis caching for frequently accessed categories and questions to reduce database load.',
    ],
    techStack: {
      Architecture:
        'Microservices, Event-Driven, Clean Architecture, BFF pattern, CQRS',
      Backend: 'Java 17 (Spring Boot 3.2), Node.js (ExpressJS)',
      Database: 'PostgreSQL, MongoDB, Redis',
      Messaging: 'Apache Kafka, RabbitMQ',
      DevOps: 'Docker, Kubernetes, GitHub Actions, GCP',
    },
    teamSize: 9,
  },
  {
    title: 'BBUS (Bus Management System)',
    role: 'Back-end & Front-end Developer',
    company: 'FPT University',
    period: '12/2024 -- 05/2025',
    description: [
      'A comprehensive school bus management platform for real-time tracking, student safety monitoring, and parent-driver communication.',
      'Multi-platform system with Web Admin Portal (React), Mobile App (Flutter for parents/drivers), and Backend API (Spring Boot).',
      'Serves 500+ buses, 5,000+ students, and 10,000+ parents with real-time GPS tracking, attendance management, and push notifications.',
    ],
    responsibilities: [
      'Backend Development (Partial): Developed REST APIs for Student Management, Attendance Tracking, and Event Reporting modules.',
      'Built attendance check-in/check-out APIs with checkpoint tracking and real-time updates via WebSocket.',
      'Implemented event reporting services with severity levels and lifecycle status tracking.',
      'Integrated AWS S3 for file storage and Firebase Cloud Messaging for safety notifications.',
      'Worked on real-time bus location updates using MQTT and pushed them to WebSocket clients.',
      'Frontend Development (Full Admin Web): Built the entire Admin Web Portal from scratch, using React 19 and TypeScript, featuring 14 modules and 45+ type-safe routes.',
      'Implemented real-time dashboards with Google Maps/Leaflet integration and state management using Zustand and TanStack Query.',
    ],
    techStack: {
      Architecture:
        'Monolithic Backend, Component-Driven Frontend, Clean Architecture Mobile',
      Backend:
        'Java 17, Spring Boot 3.3.5, Spring Security (JWT, RBAC), Spring Data JPA, Hibernate, WebSocket',
      Frontend:
        'React 19, TypeScript 5.7, Vite 6, TanStack Router/Query, Zustand, Radix UI, Tailwind CSS',
      Database: 'PostgreSQL 15 (24 entities with complex relationships)',
      'Real-time':
        'WebSocket (bi-directional messaging), MQTT (GPS tracking), Firebase Cloud Messaging',
      Cloud: 'AWS S3 (file storage), SendGrid (email), Firebase (FCM)',
    },
    href: 'https://j2c.cc/bbus-capstone',
    isCapstone: true,
  },
  // {
  //   title: 'Student Care System',
  //   role: 'Front-end',
  //   company: 'FPT University',
  //   period: '01/2025 -- 05/2025',
  //   description: [
  //     'Developed a web-based platform for the Student Services Office at FPT University to efficiently manage student data, including attendance, grades, applications, and academic records.',
  //     'Integrated AI features to identify at-risk students, enabling staff to provide timely, data-driven interventions for improved student performance and well-being.',
  //   ],
  //   responsibilities: [
  //     'Dựng Frontend package architecture (code base)',
  //     'Build common components && Dựng UI screens for các feature của System',
  //     'Map data từ API lên UI + Fix bug',
  //     'Viết tài liệu Software Design Document + Software Requirement Specification',
  //   ],
  //   techStack: [
  //     'ReactJS (v18-ts)',
  //     'Ant Design',
  //     'Tailwind',
  //     'TanStack Query',
  //     'Zustand',
  //   ],
  //   href: 'https://j2c.cc/RDS_capstone_project',
  //   teamSize: 5,
  // },
  // {
  //   title: 'Smart Attendance on School Bus',
  //   role: 'Front-end (Web & Mobile)',
  //   company: 'FPT Software',
  //   period: '05/2024 - 11/2024',
  //   description: [
  //     'Enabled automatic student check-in/out through integration with smart bus camera systems.',
  //     'Developed web admin panel (staff) and mobile app (parents, drivers, assistants).',
  //     'Integrated live bus tracking and route monitoring for parents.',
  //   ],
  //   techStack: [
  //     'ReactJS (v18-ts)',
  //     'Tailwind css',
  //     'TanStack Router/Query',
  //     'Leaflet',
  //     'Zod',
  //     'Flutter',
  //     'Firebase',
  //   ],
  //   href: '',
  //   teamSize: 6,
  // },
  {
    title: 'DeutschNerd',
    role: 'Front-end & Back-end',
    company: 'FPT University',
    period: '08/2024 -- 12/2024',
    description: [
      'An online platform that helps users practice German through exercises and vocabulary learning via flashcards.',
      'Includes dashboards for roles such as admin, teacher, and supporter.',
    ],
    techStack: {
      Frontend:
        'ReactJS (v18-ts), Styled Components, Ant Design, Redux Toolkit',
      Backend: 'ExpressJS v4',
    },
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
    techStack: {
      Frontend: 'ReactJS (v18-js), Vite, Shadcn UI, Redux Toolkit',
      Backend: 'ExpressJS v4',
      Database: 'MongoDB',
    },
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
    techStack: {
      Backend: 'Java JDBC, Servlet, Tomcat 10',
      Frontend: 'JSP, Bootstrap',
      Database: 'SQL Server',
    },
    href: 'https://j2c.cc/Group5-InsuranceManageSystem',
    teamSize: 5,
  },
];

export default projectsData;
