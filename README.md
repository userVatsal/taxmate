# TaxMate - AI-Powered UK Tax Assistant

TaxMate is a modern SaaS platform designed to help UK freelancers, creators, and small businesses automate tax management, optimize deductions, and generate self-assessment reports using real-time transaction data.

## Project Structure

```
taxmate/
├── frontend/           # Next.js frontend application
└── backend/           # FastAPI backend application
```

## Setup Instructions

### Backend Setup

1. Create a Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows
source venv/bin/activate      # On Unix/MacOS
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with the following variables:
```
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=taxmate
SECRET_KEY=your-secret-key-here-change-in-production
OPENAI_API_KEY=your-openai-api-key-here
```

4. Start the backend server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Development

- Backend API will be available at: http://localhost:8000
- Frontend application will be available at: http://localhost:3000
- API documentation will be available at: http://localhost:8000/docs

## Features

- Transaction management and categorization
- AI-powered tax deduction suggestions
- Automated report generation
- Self-assessment form integration
- Real-time financial insights

## Tech Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy
- OpenAI GPT-4
- JWT Authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 