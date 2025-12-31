// helpers/company-color.helper.ts

// Tailwind background classes (có thể tăng số lượng để giảm trùng màu)
export const COMPANY_COLORS = [
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
] as const;

type CompanyColor = (typeof COMPANY_COLORS)[number];

function normalizeCompanyName(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' '); // gộp nhiều space thành 1
}

/**
 * FNV-1a 32-bit hash: phân phối đều hơn kiểu hash*31 cho text ngắn
 */
function fnv1a32(str: string): number {
  let hash = 0x811c9dc5; // offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // prime
  }
  return hash >>> 0;
}

const companyColorCache = new Map<string, CompanyColor>();

/**
 * Company giống nhau -> màu giống nhau (stable).
 * Company khác nhau -> cố gắng phân bố đều (nhưng vẫn có thể trùng nếu màu ít).
 */
export function getCompanyColor(company: string): CompanyColor {
  const key = normalizeCompanyName(company);
  const cached = companyColorCache.get(key);
  if (cached) return cached;

  const idx = fnv1a32(key) % COMPANY_COLORS.length;
  const color = COMPANY_COLORS[idx];

  companyColorCache.set(key, color);
  return color;
}
