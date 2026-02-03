# HolaBlog Development Notes

## 📋 TODO / Pending Features

### 1. Newsletter API (Disabled)

**File:** `app/api/newsletter/route.ts`

**Status:** ⏸️ Commented out

**Reason:**

- API routes không hoạt động với static export (GitHub Pages)
- Newsletter API cần serverless runtime để xử lý POST requests

**How to enable:**

1. Deploy lên Vercel hoặc Netlify (hỗ trợ serverless)
2. Uncomment code trong `app/api/newsletter/route.ts`
3. Cấu hình Buttondown API key trong `.env`:
   ```
   BUTTONDOWN_API_KEY=your_api_key
   ```
4. Xóa `output: 'export'` trong `next.config.js` nếu có

**Related files:**

- `app/api/newsletter/route.ts` - API endpoint
- `components/NewsletterForm.tsx` - UI component
- `data/siteMetadata.js` - Newsletter provider config (line 44-48)

---

_Last updated: 2026-02-03_
