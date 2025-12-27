# HolaBlog

## Tổng quan

- Blog cá nhân dựng trên Next.js 15 (App Router) với MDX/Contentlayer để quản lý nội dung dạng file, tối ưu cho SEO và tốc độ tải.
- Giao diện Tailwind CSS 4, hỗ trợ dark/light mode, responsive trên desktop và mobile.
- Tích hợp hệ thống thẻ, phân trang, RSS, sitemap, và bình luận (Pliny/Contentlayer pipeline).
- Cấu hình sẵn lint/format (ESLint, Prettier, Husky + lint-staged) để giữ chất lượng mã nguồn.

## Công nghệ chính

- Next.js 15, React 19, TypeScript.
- Tailwind CSS 4, @tailwindcss/typography, @tailwindcss/forms.
- Contentlayer 2 (next-contentlayer2) + MDX cho nội dung tĩnh; rehype/remark plugins (math, katex, prism, slug, autolink...).
- Pliny cho RSS, sitemap và tiện ích blog; next-themes cho chuyển theme.
- Build tooling: PostCSS, esbuild; kiểm thử chất lượng: ESLint, Prettier, Husky.

## Cấu trúc thư mục chính

- app/: App Router pages (home, blog, tags, projects, about).
- components/: UI components (Header, Footer, Card, MDXComponents, v.v.).
- data/: Metadata, bài viết MDX, tác giả, tag feeds.
- layouts/: Layout cho bài viết, danh sách, tác giả.
- css/: Tailwind và Prism CSS.
- scripts/: Build hooks (postbuild, RSS).

## Yêu cầu hệ thống

- Node.js >= 18.x
- Yarn 3 (đã khai báo trong packageManager) hoặc npm/pnpm tương đương.

## Cài đặt và chạy cục bộ

1. Cài dependencies:
   - Yarn: `yarn install`
   - Hoặc npm: `npm install`
2. Chạy dev server: `yarn dev`
3. Mở http://localhost:3000 để xem site.

## Lint & format

- Lint: `yarn lint`
- Prettier (qua lint-staged/Husky) chạy tự động khi commit; có thể chạy tay: `yarn lint` hoặc `npx prettier . --write` nếu cần.

## Build & serve

- Build: `yarn build` (bao gồm bước postbuild tạo RSS/sitemap qua scripts/postbuild.mjs).
- Serve bản build: `yarn serve`.

## Triển khai (gợi ý Vercel)

1. Kết nối repo với Vercel, chọn framework Next.js.
2. Thiết lập Node 18+; lệnh build: `yarn build`; output: `.next` (mặc định Next.js).
3. Nếu có biến môi trường riêng (ví dụ API newsletter), thêm trong Vercel Project Settings.
4. Deploy; Vercel tự chạy `yarn install` → `yarn build` → publish.

## Nội dung & mở rộng

- Viết bài bằng MDX trong thư mục data/blog; metadata bài viết (frontmatter) được Contentlayer đọc và build thành trang.
- Thêm tác giả tại data/authors; thêm link điều hướng ở data/headerNavLinks.
- Có thể tuỳ biến theme tại app/theme-providers.tsx và cấu hình SEO tại app/seo.tsx.
