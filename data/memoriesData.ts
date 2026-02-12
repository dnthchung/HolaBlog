export interface MemoryPhoto {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  tags?: string[];
}

const memoriesData: MemoryPhoto[] = [
  {
    src: '/static/images/memories/DSCF7974.JPG',
    alt: 'HeadQuarte Order',
    caption: 'HQ Order Team',
    tags: ['hblab'],
  },
  {
    src: '/static/images/memories/CSS2026-01 (1).jpg',
    alt: 'Kojiro 803',
    caption: 'KJ Team',
    tags: ['hblab'],
  },
  {
    src: '/static/images/memories/MEDIART-00202.jpg',
    alt: 'AE HB1',
    caption: 'AE HB1',
    tags: ['hblab'],
  },
  {
    src: '/static/images/memories/MEDIART-00263.jpg',
    alt: 'YEP2025',
    caption: 'YEP2025 HB1',
    tags: ['hblab'],
  },
  {
    src: '/static/images/memories/YEP-HB1-TEAM.jpeg',
    alt: 'YEP2025-HB1-Team',
    caption: 'YEP2025 bộ phận HB1',
    tags: ['hblab'],
  },
];
export default memoriesData;
