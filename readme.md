# nextjs-express-AES-256-CBC

🔐 **Full-stack encryption demo with Next.js frontend and Express.js backend using AES-256-CBC encryption**

A complete implementation of secure API communication using industry-standard AES-256-CBC encryption with random initialization vectors (IVs). This project demonstrates how to build encrypted REST APIs with automatic encryption/decryption middleware.

## 🚀 Features

- **🔒 End-to-End Encryption**: All API requests and responses encrypted with AES-256-CBC
- **🎲 Random IVs**: New initialization vector for each message (prevents replay attacks)
- **🔧 Automatic Middleware**: Transparent encryption/decryption in Express.js
- **⚡ Server Actions**: Clean Next.js server actions for API calls
- **🛡️ Secure Key Management**: Environment-based encryption key storage
- **🎨 Modern UI**: Beautiful, responsive Next.js frontend
- **📦 Production Ready**: Industry-standard security practices

## 🏗️ Architecture

```
┌─────────────────┐    🔐 Encrypted     ┌─────────────────┐
│   Next.js       │◄──── HTTPS ────────►│   Express.js    │
│   Frontend      │     AES-256-CBC     │   Backend       │
│                 │                     │                 │
│ • Server Actions│                     │ • Crypto        │
│ • Crypto Utils  │                     │   Middleware    │
│ • Clean UI      │                     │ • REST API      │
└─────────────────┘                     └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **State**: React Hooks + useTransition
- **API**: Server Actions for secure server-side operations

### Backend (Express.js)
- **Framework**: Express.js
- **Encryption**: Node.js Crypto module
- **Middleware**: Custom AES-256-CBC encryption middleware
- **Security**: Environment-based configuration

### Security
- **Algorithm**: AES-256-CBC (Advanced Encryption Standard)
- **Key Size**: 256-bit encryption key
- **IV**: 128-bit random initialization vectors
- **Mode**: Cipher Block Chaining (CBC)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Basic understanding of encryption concepts
- Familiarity with Next.js and Express.js

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/MuhdHanish/nextjs-express-AES-256-CBC.git
cd nextjs-express-AES-256-CBC
```

### 2. Setup Backend (Express.js)
```bash
cd server
npm install

# Create .env file
echo "ENCRYPTION_KEY=your-256-bit-hex-key-here" > .env
echo "PORT=3001" >> .env

# Start server
npm start
```

### 3. Setup Frontend (Next.js)
```bash
cd ../client
npm install

# Create .env.local file
echo "ENCRYPTION_KEY=your-256-bit-hex-key-here" > .env.local
echo "EXPRESS_API_URL=http://localhost:3001" >> .env.local

# Start development server
npm run dev
```

### 4. Test the Application
- Open http://localhost:3000 in your browser
- Try the different API endpoints
- Check browser network tab to see encrypted data in transit

## 📁 Project Structure

```
nextjs-express-AES-256-CBC/
├── 📂 server/                     # Express.js Backend
│   ├── 📂 middleware/
│   │   └── index.js              # AES-256-CBC encryption middleware
│   ├── 📂 controller/
│   │   └── index.js              # API route controllers
│   ├── 📂 service/
│   │   └── index.js              # Business logic
│   ├── 📂 config/
│   │   └── index.js              # Configuration
│   ├── .env                      # Environment variables
│   ├── index.js                 # Express server entry point
│   └── package.json
│
├── 📂 client/                     # Next.js Frontend
│   ├── 📂 lib/
│   │   ├── crypto.js             # Client-side crypto utilities
│   │   └── 📂 actions/
│   │       └── product.actions.js # Server actions for API calls
│   ├── 📂 app/
│   │   └── page.js # Main UI component
│   ├── .env.local                # Environment variables
│   ├── next.config.js
│   └── package.json
│
└── README.md
```

## 🔐 Security Implementation

### Encryption Flow
1. **Request**: Client encrypts data with AES-256-CBC + random IV
2. **Transport**: Encrypted data sent via HTTPS
3. **Server**: Middleware automatically decrypts incoming requests
4. **Processing**: Business logic works with plain data
5. **Response**: Middleware encrypts outgoing responses
6. **Client**: Receives and decrypts response data

### Key Features
- **Random IVs**: Each message uses a unique initialization vector
- **Header-based IV**: IV sent in response headers for decryption
- **Automatic Processing**: Transparent to business logic
- **Error Handling**: Graceful failure modes
- **Environment Security**: Keys stored in environment variables

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/echo` | Echo test for encryption verification |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |

## 🔧 Configuration

### Server Environment Variables (.env)
```bash
ENCRYPTION_KEY=your-256-bit-hex-key-here
PORT=3001
```

### Client Environment Variables (.env.local)
```bash
ENCRYPTION_KEY=your-256-bit-hex-key-here
EXPRESS_API_URL=http://localhost:3001
```

### Generating Encryption Keys
```bash
# Generate a secure 256-bit key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🧪 Testing

### Manual Testing
1. Start both servers
2. Open browser developer tools
3. Make API calls through the UI
4. Observe encrypted data in Network tab
5. Verify decrypted responses in the UI

### Network Traffic Example
```
Request Headers:
IV: a1b2c3d4e5f6789012345678901234567

Request Body:
"8f4e7a1b9c2d5e8f3a6b9c1d4e7a2b5c8e9f..."

Response Headers:
IV: f9e8d7c6b5a4938271605948372615a4b

Response Body:
"2c5b8e1f4a7d0c3f6e9b2a5d8f1e4b7a0c3d..."
```

## 🚀 Deployment

### Backend (Express.js)
```bash
# Build and deploy to your preferred platform
# Ensure environment variables are set
# Recommended: Railway, Render, or DigitalOcean
```

### Frontend (Next.js)
```bash
# Build for production
npm run build

# Deploy to Vercel, Netlify, or similar
# Set environment variables in deployment platform
```

## 🔒 Security Best Practices

- ✅ **Never expose encryption keys** in frontend code
- ✅ **Use HTTPS** in production
- ✅ **Rotate encryption keys** regularly
- ✅ **Validate all inputs** before encryption
- ✅ **Use environment variables** for configuration
- ✅ **Monitor for unusual traffic** patterns
- ✅ **Implement rate limiting** for production

## ⭐ Acknowledgments

- Node.js Crypto module for encryption functionality
- Express.js for robust backend framework
- Next.js for modern React framework
- The cryptography community for security best practices