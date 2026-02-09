export interface MemoryPhoto {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  tags?: string[];
}

const memoriesData: MemoryPhoto[] = [
  {
    src: '/static/images/memories/lake.jpg',
    alt: 'Lake scenery',
    caption: 'Peaceful lake view',
    tags: ['personal'],
  },
  {
    src: '/static/images/memories/maple.jpg',
    alt: 'Maple leaves',
    caption: 'Autumn maple leaves',
    tags: ['personal'],
  },
  {
    src: '/static/images/memories/mountains.jpg',
    alt: 'Mountain landscape',
    caption: 'Mountain adventure',
    tags: ['personal'],
  },
  {
    src: '/static/images/memories/toronto.jpg',
    alt: 'Toronto cityscape',
    caption: 'Toronto skyline',
    tags: ['personal'],
  },
  {
    src: '/static/images/memories/DSCF7974.JPG',
    alt: 'Consignment Order',
    caption: 'Consignment Order',
    tags: ['hblab'],
  },
  {
    src: '/static/images/memories/CSS2026-01 (1).jpg',
    alt: 'Kojiro 803',
    caption: 'Kojiro 803',
    tags: ['hblab'],
  },
];

export default memoriesData;
