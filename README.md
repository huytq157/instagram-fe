# Instagram Clone - Frontend

## 📋 Mô tả dự án

Đây là một ứng dụng web Instagram clone được xây dựng bằng React, mô phỏng các tính năng chính của Instagram bao gồm đăng ký, đăng nhập, đăng bài, like, comment, follow, chat realtime và nhiều tính năng khác.

## ✨ Tính năng chính

### 🔐 Xác thực người dùng
- Đăng ký tài khoản với email
- Đăng nhập bằng email/password
- Đăng nhập bằng Google, Facebook
- Xác thực email qua OTP
- Quên mật khẩu và đặt lại mật khẩu
- Bảo vệ route với Protected Layout

### 📱 Giao diện chính
- **Home Feed**: Hiển thị bài đăng từ người dùng đã follow
- **Explore**: Khám phá bài đăng từ tất cả người dùng
- **Profile**: Trang cá nhân với thông tin, bài đăng, followers/following
- **Messages**: Chat realtime với người dùng khác
- **Sidebar**: Menu điều hướng với thông báo và tìm kiếm

### 📝 Quản lý bài đăng
- Tạo bài đăng với hình ảnh/video
- Like và unlike bài đăng
- Comment và reply comment
- Save bài đăng vào bộ sưu tập
- Chỉnh sửa và xóa bài đăng
- Ẩn bài đăng khỏi feed

### 👥 Tương tác xã hội
- Follow/Unfollow người dùng
- Tìm kiếm người dùng
- Xem danh sách followers/following
- Gợi ý tài khoản để follow

### 💬 Chat & Messaging
- Chat realtime với Socket.IO
- Gửi tin nhắn text và hình ảnh
- Xem danh sách cuộc trò chuyện
- Đánh dấu tin nhắn đã đọc

### 🔔 Thông báo
- Thông báo realtime cho like, comment, follow
- Hiển thị số thông báo chưa đọc
- Đánh dấu thông báo đã xem

## 🛠 Công nghệ sử dụng

### Frontend Framework
- **React 18.2.0** - UI Framework
- **React Router DOM 6.20.1** - Routing
- **React Query 4.32.0** - State management và caching

### UI/UX Libraries
- **Material-UI (MUI) 5.14.20** - Component library
- **Emotion** - CSS-in-JS styling
- **Swiper 11.0.5** - Carousel/Slider
- **React Hot Toast 2.4.1** - Notifications
- **NProgress 0.2.0** - Loading bar

### Form & Validation
- **React Hook Form 7.48.2** - Form handling
- **Formik 2.4.5** - Alternative form library
- **Yup 1.3.2** - Schema validation

### Real-time Communication
- **Socket.IO Client 4.7.2** - Real-time messaging và notifications

### Authentication & Security
- **JWT Decode 4.0.0** - JWT token handling
- **Firebase 10.7.1** - Social authentication

### Utilities
- **Axios 1.6.2** - HTTP client
- **React Helmet Async 2.0.3** - Document head management
- **React Copy to Clipboard 5.1.0** - Copy functionality
- **Emoji Picker React 4.5.16** - Emoji picker
- **Tippy.js React 4.2.6** - Tooltips

## 📁 Cấu trúc thư mục

```
src/
├── components/           # React components
│   ├── Account/         # Components liên quan đến tài khoản
│   ├── Auth/           # Components xác thực
│   ├── Comment/        # Components comment
│   ├── Layouts/        # Layout components
│   ├── Message/        # Components chat/messaging
│   ├── Modal/          # Modal components
│   ├── Post/           # Components bài đăng
│   ├── Sidebar/        # Sidebar components
│   └── Skeleton/       # Loading skeleton components
├── context/            # React Context providers
├── hook/               # Custom React hooks
├── icons/              # SVG icon components
├── pages/              # Page components
├── routers/            # Routing configuration
├── services/           # API services
├── theme/              # MUI theme configuration
└── utils/              # Utility functions
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (version 16 trở lên)
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy dự án ở môi trường development
```bash
npm start
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

### Build dự án cho production
```bash
npm run build
```

### Chạy test
```bash
npm test
```

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` trong thư mục gốc với các biến môi trường:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5001
REACT_APP_CHAT_SOCKET_URL=http://localhost:5002
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 📱 Responsive Design

Ứng dụng được thiết kế responsive và tương thích với:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Theme & Styling

- Sử dụng Material-UI theme system
- Hỗ trợ dark mode/light mode
- Custom color palette
- Responsive typography
- Consistent spacing system

## 🔒 Bảo mật

- JWT token authentication
- Protected routes
- Input validation
- XSS protection
- CORS configuration

## 📊 Performance

- Code splitting với React.lazy()
- Image optimization
- Lazy loading cho components
- React Query caching
- Optimized bundle size

---

**Lưu ý**: Đây là dự án clone để học tập và nghiên cứu. Không sử dụng cho mục đích thương mại.
