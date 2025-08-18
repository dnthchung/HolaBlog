Tôi sẽ hướng dẫn bạn các thao tác để chạy và kiểm tra project HolaBlog:

## 🚀 Cách chạy project

### 1. **Cài đặt dependencies (lần đầu)**
```bash
cd apps/server
bun install
```

### 2. **Setup database và dữ liệu mẫu (lần đầu)**
```bash
bun run db:setup
```
Lệnh này sẽ:
- Khởi động Docker containers
- Tạo database schema
- Thêm dữ liệu mẫu (users và blogs)

### 3. **Chạy development server**
```bash
bun run dev
```

## 🔍 Các cách kiểm tra project

### **1. Kiểm tra API endpoints**

Mở trình duyệt hoặc dùng Postman/curl:

```bash
# Kiểm tra server đang chạy
curl http://localhost:3000

# Kiểm tra API health
curl http://localhost:3000/api/health

# Xem danh sách users
curl http://localhost:3000/api/users

# Xem danh sách blogs
curl http://localhost:3000/api/blogs

# Xem blog cụ thể theo slug
curl http://localhost:3000/api/blogs/getting-started-modern-web-development
```

### **2. Kiểm tra database qua Drizzle Studio**
```bash
bun run db:studio
```
Mở: http://localhost:4983

### **3. Kiểm tra Docker containers**
```bash
# Xem containers đang chạy
docker ps

# Xem logs database
docker logs holablog-mysql
```

## 🛠️ Các lệnh hữu ích khác

### **Database Management**
```bash
# Khởi động database
bun run db:start

# Dừng database
bun run db:stop

# Reset toàn bộ database
bun run db:reset

# Chỉ thêm dữ liệu mẫu
bun run db:seed

# Xem logs database real-time
bun run db:watch
```

### **Development**
```bash
# Type checking
bun run check-types

# Build production
bun run build

# Chạy production
bun run start
```

## 📋 Checklist để kiểm tra project hoạt động

Let me run a quick check to see the current status:
```bash
cd apps/server && ls -la
```
## ✅ Checklist kiểm tra:

1. **✅ Server khởi động**: `http://localhost:3000` trả về welcome message
2. **✅ API hoạt động**: `http://localhost:3000/api` trả về API info
3. **✅ Health check**: `http://localhost:3000/api/health` trả về healthy status
4. **✅ Users API**: `http://localhost:3000/api/users` trả về danh sách 4 users
5. **✅ Blogs API**: `http://localhost:3000/api/blogs` trả về danh sách 5 blogs
6. **✅ Database**: Drizzle Studio mở được và hiển thị data
7. **✅ Docker**: Container `holablog-mysql` đang chạy

## 🚨 Troubleshooting

### **Nếu gặp lỗi port đã được sử dụng:**
```bash
# Kill process trên port 3000
npx kill-port 3000
# Hoặc thay đổi PORT trong file env
```

### **Nếu database không kết nối được:**
```bash
# Restart database
bun run db:down
bun run db:start
# Đợi 10-15 giây rồi
bun run db:push
```

### **Nếu thiếu dữ liệu:**
```bash
bun run db:seed
```

