└── src/
    ├── api/ # Thay thế cho 'routers', chứa tất cả logic về API
    │   ├── quizzes/ # Module cho tài nguyên 'quizzes'
    │   │   ├── quiz.controller.ts  # Logic xử lý request, response
    │   │   ├── quiz.service.ts     # Logic nghiệp vụ, tương tác DB
    │   │   ├── quiz.router.ts      # Định nghĩa các routes cho '/quizzes'
    │   │   └── quiz.schema.ts      # DTOs và schema validation (dùng Zod)
    │   │
    │   ├── users/ # Module cho tài nguyên 'users'
    │   │   ├── user.controller.ts
    │   │   ├── user.service.ts
    │   │   ├── user.router.ts
    │   │   └── user.schema.ts
    │   │
    │   └── index.ts                # File tổng hợp tất cả các router con
    │
    ├── db/
    │   ├── index.ts                # Khởi tạo Drizzle client & kết nối DB
    │   └── schema.ts               # Định nghĩa TẤT CẢ schema của Drizzle
    │
    ├── middlewares/
    │   ├── auth.middleware.ts      # Middleware xác thực (ví dụ: check JWT)
    │   └── error.middleware.ts     # Middleware xử lý lỗi tập trung
    │
    ├── utils/
    │   ├── logger.ts               # Cấu hình logger (ví dụ: pino, winston)
    │   └── exceptions.ts           # Định nghĩa các class lỗi custom
    │
    └── index.ts                    # Entry point, khởi tạo Express app