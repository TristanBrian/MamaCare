# MamaCare - Maternal Health Platform

![MamaCare Preview](https://mmamacare.netlify.app/prenatal)

Multilingual, AI-powered maternal health support system

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [System Architecture](#system-architecture)
- [Installation & Setup](#installation--setup)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Project Overview

MamaCare is a full-stack maternal health platform that provides:

- 📚 Medically verified pregnancy education (English/Swahili)
- 🤖 AI-powered symptom checker & Q&A assistant
- 🏥 Role-based dashboards for patients/providers
- 🚨 Emergency protocol guides
- 📅 Appointment scheduling system

**Target Users:**

- Expectant mothers in East Africa
- Clinics & healthcare providers
- Community health workers

---

## ✨ Key Features

| Feature            | Description                                | Tech Used                  |
|--------------------|--------------------------------------------|---------------------------|
| Multilingual FAQ   | Searchable pregnancy Q&A with upvote/downvote | React Query, Accordion UI |
| AI Assistant       | ChatGPT-style medical guidance             | OpenAI API, NLP intent filtering |
| Role-Based Dashboards | Custom views for patients/doctors/admins | Protected Routes, JWT Auth |
| Symptom Triage     | Red-flag symptom detection algorithm       | Decision tree logic        |

---

## 🛠 Tech Stack

### Frontend

- Framework: React 18 + TypeScript
- Styling: Tailwind CSS + ShadCN UI
- State Management: React Query, Zustand
- Routing: React Router 6
- Icons: Lucide-react

### Backend

- API: Python Flask
- ML Models: scikit-learn, TensorFlow
- Authentication: Mock users (replace with real auth in production)

### DevOps

- Build: Vite
- Testing: Jest + React Testing Library
- CI/CD: GitHub Actions → AWS Amplify

---

## 📂 Project Structure

```
src/
├── assets/           # Static images/fonts
├── components/       # Reusable UI
│   ├── ui/           # ShadCN components
│   ├── auth/         # Login/register forms
│   └── pregnancy/    # FAQ, AI chat widgets
├── contexts/         # Language/Auth providers
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── pages/            # Route components
│   ├── public/       # Home, Education
│   └── protected/    # Dashboards
├── types/            # TypeScript interfaces
├── App.tsx           # Root component
└── main.tsx          # Entry point
python-backend/
├── app.py            # Flask backend app
├── models/           # ML models (sklearn, TensorFlow)
├── requirements.txt  # Python dependencies
```

---

## ⚙️ System Architecture

User → React Frontend → API Calls → Flask Backend → ML Models → Database

3rd Party APIs: Twilio, OpenAI

PWA Offline Cache enabled

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js ≥18.x
- npm or yarn
- Python 3.11+
- Python virtual environment tools

### Steps

```bash
# Clone repo
git clone https://github.com/TristanBrian/MamaCare
cd mamacare

# Install frontend dependencies
npm install

# Setup backend virtual environment
cd python-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Ensure models are in place
# models/sklearn_model.pkl
# models/tf_model/

# Run frontend dev server
cd ..
npm run dev

# Run backend Flask app
cd python-backend
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

Access frontend at http://localhost:3000 (or as configured)

---

## 🔌 API Integration

### AI Assistant Endpoint Example

```typescript
const fetchAIResponse = async (query: string) => {
  const response = await fetch('/api/ai-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return response.json();
};
```

---

## 🧪 Testing

- Unit Tests: `npm test` (Jest)
- Test Coverage: ≥80% for critical components (auth, symptom checker)
- Mocked API responses using MSW

---

## 🌐 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard.

---

## 🤝 Contributing

- Fork the repository
- Create a feature branch (`git checkout -b feat/awesome-feature`)
- Commit changes (`git commit -m 'Add feature'`)
- Push to branch (`git push origin feat/awesome-feature`)
- Open a Pull Request

---

## 📜 License

MIT License © 2025 MamaCare Team

---

## 📬 Contact

dev@mamacare.org | [Live Demo](https://mmamacare.netlify.app/prenatal)
