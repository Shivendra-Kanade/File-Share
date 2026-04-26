# FileShare — Java Full Stack Project

A full-stack **File Sharing Web Application** built with **Spring Boot** (backend) and **React + CSS** (frontend).

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database   | H2 (dev) / MySQL (production)       |
| Frontend   | React 18, React Router v6, Axios    |
| Styling    | CSS3 with custom properties         |
| File Upload| React Dropzone                      |
| Build      | Maven (backend), npm (frontend)     |

---

## Project Structure

```
fileshare/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/java/com/fileshare/
│       │   ├── FileShareApplication.java       ← Entry point
│       │   ├── config/
│       │   │   └── CorsConfig.java             ← CORS setup
│       │   ├── controller/
│       │   │   └── FileController.java         ← REST API
│       │   ├── dto/
│       │   │   └── FileDTO.java                ← API response model
│       │   ├── exception/
│       │   │   └── GlobalExceptionHandler.java ← Error handling
│       │   ├── model/
│       │   │   └── FileEntity.java             ← JPA entity
│       │   ├── repository/
│       │   │   └── FileRepository.java         ← Data access
│       │   └── service/
│       │       └── FileService.java            ← Business logic
│       ├── main/resources/
│       │   └── application.properties
│       └── test/
│           └── FileShareApplicationTests.java
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.js / App.css
        ├── index.js / index.css
        ├── services/
        │   └── fileService.js                  ← Axios API calls
        ├── components/
        │   ├── Navbar.js / Navbar.css
        │   └── FileCard.js / FileCard.css
        └── pages/
            ├── HomePage.js / HomePage.css
            ├── UploadPage.js / UploadPage.css
            ├── MyFilesPage.js / MyFilesPage.css
            └── DownloadPage.js / DownloadPage.css
```

---

## REST API Endpoints

| Method | Endpoint                        | Description                  |
|--------|---------------------------------|------------------------------|
| POST   | `/api/files/upload`             | Upload a file                |
| GET    | `/api/files/download/{code}`    | Download file by share code  |
| GET    | `/api/files/info/{code}`        | Get file metadata            |
| GET    | `/api/files/all`                | List all files               |
| GET    | `/api/files/user/{username}`    | Files by uploader            |
| DELETE | `/api/files/{id}`               | Delete a file                |
| GET    | `/api/files/health`             | API health check             |

---

## Frontend Pages

| Route                    | Page             | Description                        |
|--------------------------|------------------|------------------------------------|
| `/`                      | Home             | Landing page with features & steps |
| `/upload`                | Upload           | Drag & drop file upload            |
| `/my-files`              | My Files         | Dashboard with all uploaded files  |
| `/download/:shareCode`   | Download         | File info + download for recipients|

---

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+

### 1. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

Server runs at **http://localhost:8080**

H2 Console available at: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:filesharedb`
- Username: `sa` | Password: (empty)

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

App runs at **http://localhost:3000**

---

## Switch to MySQL (Production)

1. Uncomment MySQL dependency in `pom.xml`
2. Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/filesharedb
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

3. Create the database:
```sql
CREATE DATABASE filesharedb;
```

---

## Features

- ✅ Drag & drop file upload (up to 100MB)
- ✅ Unique 8-character share codes per file
- ✅ Shareable download links
- ✅ File metadata (size, type, uploader, date)
- ✅ Download counter tracking
- ✅ Auto-expiry after 7 days
- ✅ Delete files from dashboard
- ✅ Filter files by uploader name
- ✅ Upload progress indicator
- ✅ Responsive design for mobile
- ✅ Dark-themed modern UI
