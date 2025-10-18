# Unidox Backend - CRUD API

A robust REST API built with Express.js, TypeScript, Prisma, and MongoDB following best practices and standard project structure.

## 🚀 Features

- ✅ **Full CRUD operations** for Users, Documents, Dossiers, and Notifications
- ✅ **Service Layer Architecture** - Separation of concerns with controllers and services
- ✅ **Type Safety** - Full TypeScript support with Prisma types
- ✅ **Error Handling** - Global error handler with custom error types
- ✅ **Validation** - Request validation and sanitization
- ✅ **Security** - Helmet, CORS, and rate limiting
- ✅ **Database** - MongoDB with Prisma ORM
- ✅ **Code Quality** - DRY principles and standard naming conventions

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── prisma.ts    # Prisma client configuration
│   ├── controllers/     # Request handlers
│   │   ├── user.controller.ts
│   │   ├── document.controller.ts
│   │   ├── dossier.controller.ts
│   │   └── notification.controller.ts
│   ├── services/        # Business logic layer
│   │   ├── user.service.ts
│   │   ├── document.service.ts
│   │   ├── dossier.service.ts
│   │   └── notification.service.ts
│   ├── routes/          # API routes
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   ├── document.routes.ts
│   │   ├── dossier.routes.ts
│   │   └── notification.routes.ts
│   ├── middleware/      # Express middleware
│   │   ├── index.ts
│   │   └── error.middleware.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── server.ts        # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── API_DOCUMENTATION.md # Complete API documentation
```

## 🛠️ Architecture

### Service Layer Pattern

**Controllers** → Handle HTTP requests/responses
- Input validation
- Call service methods
- Format responses

**Services** → Business logic
- Database operations
- Data processing
- Business rules

This separation ensures:
- Code reusability
- Easier testing
- Better maintainability
- Single responsibility principle

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Update MONGODB_URI in .env
   ```

3. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/profile` - Get user profile with documents
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Documents
- `GET /api/documents` - Get user documents
- `GET /api/documents/search` - Search documents
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document
- `PATCH /api/documents/:id/status` - Update status
- `POST /api/documents/:id/tags` - Add tags
- `DELETE /api/documents/:id/tags` - Remove tags
- `DELETE /api/documents/:id` - Delete document

### Dossiers (Folders)
- `GET /api/dossiers` - Get user dossiers
- `GET /api/dossiers/stats` - Get statistics
- `GET /api/dossiers/:id` - Get dossier by ID
- `POST /api/dossiers` - Create dossier
- `PUT /api/dossiers/:id` - Update dossier
- `POST /api/dossiers/:id/documents` - Add documents
- `DELETE /api/dossiers/:id/documents` - Remove documents
- `DELETE /api/dossiers/:id` - Delete dossier

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `GET /api/notifications/:id` - Get notification by ID
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications/read` - Delete all read

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete documentation.

## 🔍 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate    # Generate Prisma client
npm run prisma:studio      # Open Prisma Studio
npm run prisma:push        # Push schema to database
```

## 🛡️ Error Handling

The API implements comprehensive error handling:

- **Prisma errors** - Database constraint violations
- **Validation errors** - Invalid input data
- **Not found errors** - Resource not found (404)
- **Server errors** - Internal server errors (500)

All errors return consistent JSON format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info"
}
```

## 🔐 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse (100 req/15min)
- **Password Hashing** - bcrypt for user passwords
- **Input Validation** - Request sanitization

## 📊 Database

MongoDB with Prisma ORM:
- Type-safe database queries
- Auto-generated types
- Migration support
- Relation management

## 🎯 Best Practices

- ✅ DRY (Don't Repeat Yourself)
- ✅ Separation of Concerns
- ✅ RESTful API design
- ✅ Error handling middleware
- ✅ TypeScript strict mode
- ✅ Standard naming conventions
- ✅ Async/await error handling
- ✅ Environment configuration

## 🚦 Server Status

**Health Check:** http://localhost:5000/health

```json
{
  "status": "OK",
  "message": "Unidox API is running"
}
```

## 📝 Notes

- All sensitive fields (password, googleId) are excluded from responses
- User IDs are required for most operations to ensure data isolation
- Documents can have multiple tags for better organization
- Notifications support priority levels and types
- Dossiers can contain multiple documents

## 🔄 Next Steps

Consider adding:
- Authentication & Authorization (JWT)
- File upload handling (Multer)
- Request validation middleware
- Unit and integration tests
- API rate limiting per user
- Logging system (Winston/Morgan)
- Documentation (Swagger/OpenAPI)
- CI/CD pipeline

## 📄 License

ISC

---

**Status:** ✅ Server running on http://localhost:5000
