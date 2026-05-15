# README Generator API

A full-stack MERN application that exposes a REST API to generate `README.md` files in **any selected language** — both human spoken languages (English, Spanish, French, German, Chinese …) and programming languages (JavaScript, Python, Go, Rust, Java …).

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM) — used only for the Products API
- **Frontend:** React, Vite

---

## Project Structure

```
├── backend/
│   ├── config/           # Database connection
│   ├── controllers/
│   │   └── readme.controller.js   # Spoken-language README logic (15 languages)
│   ├── models/           # Mongoose schemas
│   ├── routes/
│   │   ├── readme.route.js        # /api/readme — spoken-language endpoints
│   │   ├── readme.js              # /api/readme/prog — programming-language endpoints
│   │   └── product.route.js       # /api/products CRUD
│   └── server.js         # Entry point
├── frontend-chat/        # React application
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run in development

```bash
npm run dev
```

The server starts on `http://localhost:5000`.

---

## API — Spoken-Language README Generation

Base path: `/api/readme`

Generates README files localized in 15 human languages: **English (en), Spanish (es), French (fr), German (de), Chinese (zh), Japanese (ja), Korean (ko), Portuguese (pt), Hindi (hi), Arabic (ar), Russian (ru), Italian (it), Dutch (nl), Turkish (tr), Polish (pl)**.

### Discover supported languages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/readme/languages` | All supported spoken + programming languages |
| GET | `/api/readme/languages/spoken` | Supported spoken/display languages |
| GET | `/api/readme/languages/programming` | Supported programming languages |

### Generate a README

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/readme/generate` | Generate README in one spoken language |
| POST | `/api/readme/generate/bulk` | Generate README in multiple spoken languages at once |
| POST | `/api/readme/generate/all` | Generate README in all 15 spoken languages at once |
| GET | `/api/readme/generate/:language` | Stream raw `.md` file for a spoken language |
| POST | `/api/readme/generate/by-language` | Generate README tailored to a programming language |
| GET | `/api/readme/generate/by-language/:progLang` | Stream raw `.md` for a programming language |

#### POST `/api/readme/generate` — Request body

```json
{
  "language": "fr",
  "name": "My Awesome App",
  "description": "A blazing-fast web application.",
  "features": ["Offline support", "Dark mode"],
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoUrl": "https://github.com/you/my-awesome-app",
  "license": "MIT",
  "version": "2.0.0",
  "author": "Alice",
  "programmingLanguage": "javascript",
  "format": "json"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `language` | string | No | Spoken language code, default `"en"` |
| `name` | string | **Yes** | Project name |
| `description` | string | **Yes** | Short project description |
| `features` | string[] or CSV | No | Feature list |
| `techStack` | string[] or CSV | No | Technology list |
| `repoUrl` | string | No | GitHub / remote URL |
| `license` | string | No | Default `"MIT"` |
| `version` | string | No | Default `"1.0.0"` |
| `author` | string | No | Author name |
| `programmingLanguage` | string | No | Enriches install/run commands |
| `format` | `"json"` \| `"raw"` | No | `"raw"` returns a `.md` file download |
| `save` | boolean | No | `true` to persist in the in-memory store |

#### POST `/api/readme/generate/bulk` — Request body

```json
{
  "languages": ["en", "es", "fr", "de"],
  "name": "My App",
  "description": "Cross-language README."
}
```

#### GET `/api/readme/generate/:language` — convenience download

```
GET /api/readme/generate/fr?name=MyApp&description=A+cool+app&programmingLanguage=python
```

Returns the raw Markdown file as a download.

### Saved README store (in-memory)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/readme/saved` | List all saved README entries |
| DELETE | `/api/readme/delete` | Delete all saved entries (or filter by language / programmingLanguage) |
| DELETE | `/api/readme/delete/:id` | Delete a single saved entry by ID |

---

## API — Programming-Language README Generation

Base path: `/api/readme/prog`

Generates README files tailored to 12 programming languages: **JavaScript, TypeScript, Python, Java, Go, Rust, Ruby, PHP, C#, C++, Kotlin, Swift**.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/readme/prog/languages` | List all supported programming languages |
| POST | `/api/readme/prog/generate` | Generate README for a programming language |
| POST | `/api/readme/prog/generate/download` | Generate and stream README as a file download |
| GET | `/api/readme/prog/template/:language` | Get a pre-filled request template for a language |
| DELETE | `/api/readme/prog/:language` | Delete `README.<lang>.md` from disk |
| DELETE | `/api/readme/prog/bulk` | Delete READMEs for multiple languages |
| DELETE | `/api/readme/prog/all` | Delete all README files from disk |

#### POST `/api/readme/prog/generate` — Request body

```json
{
  "projectName": "FastAPI Service",
  "description": "A high-performance REST API built with Python.",
  "language": "python",
  "authorName": "Bob",
  "authorGithub": "bobdev",
  "repoName": "fastapi-service",
  "features": [
    "Async request handling",
    "JWT authentication",
    "Swagger UI"
  ],
  "license": "Apache-2.0",
  "includeContributing": true,
  "includeChangelog": false,
  "includeBadges": true,
  "environment": [
    { "key": "DATABASE_URL", "value": "postgresql://...", "description": "Database connection string" },
    { "key": "SECRET_KEY", "value": "changeme", "description": "JWT signing key" }
  ],
  "apiEndpoints": [
    { "method": "GET",  "endpoint": "/health",      "description": "Health check" },
    { "method": "POST", "endpoint": "/auth/login",  "description": "User login" }
  ],
  "screenshots": [
    { "alt": "Swagger UI", "url": "https://example.com/swagger.png" }
  ],
  "acknowledgements": ["FastAPI", "SQLAlchemy"]
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `projectName` | string | **Yes** | Project name |
| `description` | string | **Yes** | Short description |
| `language` | string | **Yes** | Programming language key (e.g. `"python"`) |
| `authorName` | string | No | Author display name |
| `authorGithub` | string | No | GitHub username |
| `repoName` | string | No | GitHub repository name |
| `features` | string[] | No | Feature bullets |
| `license` | string | No | License name |
| `includeContributing` | boolean | No | Add Contributing section |
| `includeChangelog` | boolean | No | Add Changelog section |
| `includeBadges` | boolean | No | Add shields.io badges |
| `customInstall` | string | No | Override default install command |
| `customRun` | string | No | Override default run command |
| `customTest` | string | No | Override default test command |
| `customBuild` | string | No | Override default build command |
| `environment` | `{key, value, description}[]` | No | Environment variable list |
| `apiEndpoints` | `{method, endpoint, description}[]` | No | API reference table |
| `screenshots` | `{alt, url}[]` | No | Screenshot images |
| `acknowledgements` | string[] | No | Acknowledgements list |

#### GET `/api/readme/prog/template/:language`

Returns a pre-filled JSON body you can pass directly to `POST /generate`:

```
GET /api/readme/prog/template/go
```

---

## Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

---

## Quick Examples

### Generate a French README enriched with Python commands

```bash
curl -X POST http://localhost:5000/api/readme/generate \
  -H "Content-Type: application/json" \
  -d '{
    "language": "fr",
    "name": "MonProjet",
    "description": "Un outil Python puissant.",
    "programmingLanguage": "python"
  }'
```

### Generate READMEs in all 15 spoken languages at once

```bash
curl -X POST http://localhost:5000/api/readme/generate/all \
  -H "Content-Type: application/json" \
  -d '{
    "name": "GlobalApp",
    "description": "A truly international project."
  }'
```

### Generate a Go-flavored README (programming-language mode)

```bash
curl -X POST http://localhost:5000/api/readme/prog/generate \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "GoService",
    "description": "A fast microservice.",
    "language": "go",
    "authorName": "Alice",
    "includeContributing": true
  }'
```

### Download a Rust README directly as a .md file

```bash
curl http://localhost:5000/api/readme/prog/generate/download \
  -o README.md
```

---

## License

MIT
