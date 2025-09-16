# Resumind - AI Resume Analyzer

An intelligent resume analysis application that provides AI-powered feedback to help job seekers optimize their resumes for specific positions and improve their chances of passing through Applicant Tracking Systems (ATS).

## Features

- 🤖 **AI-Powered Analysis**: Uses Claude 3.7 Sonnet to analyze resumes and provide detailed feedback
- 📄 **PDF Processing**: Converts PDF resumes to images for visual analysis
- 🎯 **ATS Optimization**: Evaluates how well resumes perform in Applicant Tracking Systems
- 📊 **Comprehensive Scoring**: Provides scores across multiple categories:
  - Overall Score
  - ATS Compatibility
  - Tone & Style
  - Content Quality
  - Structure
  - Skills Alignment
- 🔐 **User Authentication**: Secure login system powered by Puter.js
- 💾 **Resume Storage**: Cloud-based storage for resume files and analysis results
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- ⚡️ **Real-time Processing**: Fast resume analysis with progress indicators

## How It Works

1. **Upload Resume**: Users upload their PDF resume along with job details (company name, job title, job description)
2. **AI Analysis**: The system converts the PDF to an image and uses AI to analyze the resume against the job requirements
3. **Comprehensive Feedback**: Users receive detailed scores and improvement suggestions across multiple categories
4. **Track Progress**: Users can view all their analyzed resumes and track their improvement over time

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-resume-analyzer
```

2. Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Authentication

The application uses Puter.js for authentication and backend services. You'll need to sign in through Puter.js to access the full functionality.

## Tech Stack

- **Frontend**: React 19, React Router 7, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **File Processing**: PDF.js for PDF to image conversion
- **Backend Services**: Puter.js (Authentication, File Storage, AI, Key-Value Storage)
- **AI Model**: Claude 3.7 Sonnet via Puter.js
- **Build Tool**: Vite
- **File Upload**: React Dropzone

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── ATS.tsx         # ATS scoring component
│   │   ├── FileUploader.tsx # File upload component
│   │   ├── ResumeCard.tsx  # Resume card display
│   │   ├── Summery.tsx     # Score summary component
│   │   └── ...
│   ├── lib/                # Utility libraries
│   │   ├── puter.ts        # Puter.js integration
│   │   ├── pdf2img.ts      # PDF conversion utilities
│   │   └── utils.ts        # General utilities
│   ├── routes/             # Page components
│   │   ├── home.tsx        # Dashboard/home page
│   │   ├── upload.tsx      # Resume upload page
│   │   ├── resume.tsx      # Resume analysis results
│   │   └── auth.tsx        # Authentication page
│   └── root.tsx            # Root component
├── constants/              # Application constants
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t resumind .

# Run the container
docker run -p 3000:3000 resumind
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## API Integration

This application integrates with Puter.js for:

- **Authentication**: User login/logout
- **File Storage**: Resume and image file storage
- **AI Services**: Resume analysis using Claude 3.7 Sonnet
- **Key-Value Storage**: Storing resume metadata and analysis results

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
