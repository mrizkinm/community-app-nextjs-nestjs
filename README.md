# Community App with Next.js and Nest.js

Project ini menggunakan frontend next.js di folder frontend dan backend menggunakan nest.js di folder backend

# Backend (Nest.js)
## 🔧 Teknologi yang Digunakan

- 🧠 **NestJS (TypeScript)**
- 🛢 **TypeORM** (ORM untuk DB relasional)
- 🐘 **PostgreSQL**
- 🔐 JWT Auth

## Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/mrizkinm/community-app-nextjs-nestjs
```

### 2. Install Dependency
```bash
npm install
# atau
pnpm install
# atau
yarn install
```

### 3. Setup Environment
#### Aplikasi
```bash
PORT=3000
```

#### Database
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432,
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=community-app
```

#### Migrations
```bash
npx typeorm migration:create src/migrations/NamaMigrations

npm run migration:generate src/migrations/NamaMigrations

npm run migration:run
```

### Jalankan Aplikasi
```bash
npm run start:dev
# atau
npm run start
```

Akses di: http://localhost:3000


## List REST API
### 1. Login

**Endpoint**: `POST /api/auth/login`

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Response Body:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9rbyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTc0NDg1OTU5MSwiZXhwIjoxNzQ1NDY0MzkxfQ.xxReagMrDPjjn1OY2mn8dPPSYq-1NQ3AcWe7MflUDYI",
    "role": "admin",
    "id": 2,
    "email": "user@example.com",
    "name": "Joko"
}
```
### 2. Register

**Endpoint**: `POST /api/auth/register`

#### Request Body:
```json
{
    "email": "joko@gmail.com",
    "password": "123456",
    "name": "Joko",
    "role": "admin"
}
```
#### Response Body:
```json
{
    "id": 8,
    "email": "indro@gmail.com",
    "name": "Indro",
    "createdAt": "2025-04-17T03:18:27.727Z",
    "role": "admin"
}
```

### 3. Logout

**Endpoint**: `POST /api/auth/logout`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "message": "Logout successful"
}
```


### 4. Admin Approve Post

**Endpoint**: `POST /api/admin/approve-post/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "id": 24,
    "title": "met malam",
    "content": "hehehehehe",
    "createdAt": "2025-04-16T18:27:33.743Z",
    "status": true
}
```

### 5. Admin Delete Post

**Endpoint**: `DELETE /api/admin/delete-post/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "title": "met malam",
    "content": "hehehehehe",
    "createdAt": "2025-04-16T18:27:33.743Z",
    "status": true
}
```

### 6. Admin Delete Comment

**Endpoint**: `DELETE /api/admin/delete-comment/{commentId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "content": "hehehehehhe",
    "createdAt": "2025-04-17T02:55:24.104Z",
    "author": {
        "id": 1,
        "email": "user@gmail.com",
        "name": "Jono",
        "createdAt": "2025-04-15T16:31:23.075Z",
        "role": "user",
        "token": null
    }
}
```

### 7. Admin Analytics

**Endpoint**: `GET /api/admin/analytics`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "totalPosts": 4,
    "totalComments": 1,
    "totalUsers": 8
}
```

### 8. Admin Get List Posts

**Endpoint**: `GET /api/admin/posts`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
[
    {
        "id": 28,
        "title": "Post lagi ahh",
        "content": "okeoke",
        "createdAt": "2025-04-17T02:55:06.839Z",
        "status": true,
        "author": {
            "id": 1,
            "email": "user@gmail.com",
            "password": "$2b$10$PBg5hZhEaadoZ/JQyKy19OpvDaWY5griIO7r4OHE5Y0rn9g5cgarO",
            "name": "Jono",
            "createdAt": "2025-04-15T16:31:23.075Z",
            "role": "user",
            "token": null
        },
        "tags": [
            {
                "id": 17,
                "name": "oke"
            }
        ],
        "likeCount": 0,
        "commentCount": 0
    }
]
```

### 9. Admin Get Detail Post

**Endpoint**: `GET /api/admin/posts/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "id": 25,
    "title": "Post pertama",
    "content": "ini adalah post pertamaku",
    "createdAt": "2025-04-17T00:40:10.958Z",
    "status": false,
    "author": {
        "id": 4,
        "email": "hendro@gmail.com",
        "name": "Hendro",
        "createdAt": "2025-04-17T00:38:03.673Z",
        "role": "user",
        "token": null
    },
    "tags": [
        {
            "id": 11,
            "name": "yeay"
        },
        {
            "id": 12,
            "name": "first"
        }
    ],
    "likeCount": 1,
    "commentCount": 0
}
```

### 10. Admin Get List Comments by PostID

**Endpoint**: `GET /api/admin/comments/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
[
    {
        "id": 11,
        "content": "helo hendro",
        "createdAt": "2025-04-17T02:54:42.538Z",
        "author": {
            "id": 1,
            "email": "user@gmail.com",
            "password": "$2b$10$PBg5hZhEaadoZ/JQyKy19OpvDaWY5griIO7r4OHE5Y0rn9g5cgarO",
            "name": "Jono",
            "createdAt": "2025-04-15T16:31:23.075Z",
            "role": "user",
            "token": null
        },
        "likeCount": 0
    }
]
```

### 11. User Create Posts

**Endpoint**: `POST /api/user/posts`
```http
Authorization: Bearer your_token_here
```
#### Request Body:
```json
{
    "title": "Hello",
    "content": "My second post",
    "tags": ["info", "post"]
}
```
#### Response Body:
```json
{
    "id": 29,
    "title": "Hello",
    "content": "My second post",
    "createdAt": "2025-04-17T03:41:49.981Z",
    "status": false,
    "author": {
        "id": 1
    },
    "tags": [
        {
            "id": 8,
            "name": "info"
        },
        {
            "id": 9,
            "name": "post"
        }
    ]
}
```

### 12. User Get List Posts

**Endpoint**: `GET /api/user/posts`
```http
Authorization: Bearer your_token_here
```
#### Response Body:
```json
[
    {
        "id": 28,
        "title": "Post lagi ahh",
        "content": "okeoke",
        "createdAt": "2025-04-17T02:55:06.839Z",
        "status": true,
        "author": {
            "id": 1,
            "email": "user@gmail.com",
            "password": "$2b$10$PBg5hZhEaadoZ/JQyKy19OpvDaWY5griIO7r4OHE5Y0rn9g5cgarO",
            "name": "Jono",
            "createdAt": "2025-04-15T16:31:23.075Z",
            "role": "user",
            "token": null
        },
        "tags": [
            {
                "id": 17,
                "name": "oke"
            }
        ],
        "likeCount": 0,
        "commentCount": 0
    }
]
```

### 13. User Get Detail Posts

**Endpoint**: `GET /api/user/posts/{postId}`
```http
Authorization: Bearer your_token_here
```
#### Response Body:
```json
{
    "id": 29,
    "title": "Hello",
    "content": "My second post",
    "createdAt": "2025-04-17T03:41:49.981Z",
    "status": false,
    "author": {
        "id": 1,
        "email": "user@gmail.com",
        "name": "Jono",
        "createdAt": "2025-04-15T16:31:23.075Z",
        "role": "user",
        "token": null
    },
    "tags": [
        {
            "id": 8,
            "name": "info"
        },
        {
            "id": 9,
            "name": "post"
        }
    ],
    "likeCount": 0,
    "commentCount": 0
}
```

### 14. User Comment Post

**Endpoint**: `POST /api/user/comments/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Request Body:
```json
{
    "content": "Helloo"
}
```
#### Response Body:
```json
{
    "id": 14,
    "content": "Helloo",
    "createdAt": "2025-04-17T03:52:45.083Z",
    "author": {
        "id": 1,
        "email": "user@gmail.com",
        "name": "Jono",
        "role": "user"
    },
    "post": {
        "id": 27,
        "title": "hehe",
        "content": "hehehehe",
        "createdAt": "2025-04-17T01:34:49.810Z",
        "status": true
    }
}
```

### 15. User Get List Comment Post

**Endpoint**: `GET /api/user/comments/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
[
    {
        "id": 14,
        "content": "Helloo",
        "createdAt": "2025-04-17T03:52:45.083Z",
        "author": {
            "id": 1,
            "email": "user@gmail.com",
            "password": "$2b$10$PBg5hZhEaadoZ/JQyKy19OpvDaWY5griIO7r4OHE5Y0rn9g5cgarO",
            "name": "Jono",
            "createdAt": "2025-04-15T16:31:23.075Z",
            "role": "user",
            "token": null
        },
        "likeCount": 0
    }
]
```

### 16. User Toggle Like Post

**Endpoint**: `POST /api/user/likes/post/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "liked": true
}
```

### 17. User Toggle Like Comment

**Endpoint**: `POST /api/user/likes/comment/{postId}`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
{
    "liked": true
}
```

### 18. User Get List Tags

**Endpoint**: `GET /api/user/tags`
```http
Authorization: Bearer your_token_here
```

#### Response Body:
```json
[
    {
        "id": 7,
        "name": "makan"
    },
    {
        "id": 8,
        "name": "info"
    }
]
```

### Contoh response 400
```json
{
    "message": [
        "content should not be empty"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### Contoh response forbidden access (token kosong atau tidak sesuai role)
```json

{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```

### Contoh response 404
```json
{
    "message": "Cannot GET /api/posts",
    "error": "Not Found",
    "statusCode": 404
}
```
### Contoh response forbidden access 403 (token kosong atau tidak sesuai role)
```json

{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```
---

# Frontend (Next.js)

## Teknologi yang Digunakan

- ⚛️ **Next.js 15 (App Router)**
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS**
- 🧩 **ShadCN UI**

## Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/mrizkinm/community-app-nextjs-nestjs
```

### 2. Install Dependency
```bash
npm install
# atau
pnpm install
# atau
yarn install
```

### 3. Jalankan Project

```bash
npm run dev
# atau
pnpm dev
# atau
yarn dev
```
Buka di browser: http://localhost:3001

## Menu yang ada di halaman frontend

### Halaman login
- Login dengan role admin atau user
- https://localhost:3001/login

### Halaman register
- Register untuk role admin atau user
- https://localhost:3001/register

### Menu role User

#### Home
- https://localhost:3001/user/posts
- Untuk melihat semua daftar postingan user di community
- User bisa like postingan sendiri dan orang lain dengan klik tombol like

#### Detail Post
- https://localhost:3001/user/posts/{id}
- User bisa melihat detail postingan dengan klik title atau klik tombol comment
- User bisa juga berkomentar dengan user lainnya

#### Create post
- https://localhost:3001/user/create-post
- Untuk membuat postingan baru. Postingan akan disetujui oleh admin terlebih ddahulu sebelum ditampilkan

#### Profile
- https://localhost:3001/user/profile
- Untuk melihat postingan user sendiri

#### Logout
- Keluar dari sesi

### Menu role Admin

#### Home
- http://localhost:3001/admin/home
- Untuk melihat analytics (total posts, total comments dan total users)

#### Manage Posts
- http://localhost:3001/admin/posts
- Untuk manajemen post
- Admin bisa approve post yang belum di approve (pending) atau juga menghapus post tersebut

#### Detail Post
- https://localhost:3001/admin/posts/{id}
- Admin bisa melihat detail postingan dengan klik title atau klik tombol comment
- Admin bisa juga menghapus komentar dengan cara masuk dulu ke detail postingan (klik judul postingan atau comments) kemudian klik tombol delete

#### Logout
- Keluar dari sesi