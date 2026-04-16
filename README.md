
# AI Document Q&A System

A portfolio-safe document question-answering app inspired by enterprise document search workflows.

## Tech Stack
- Backend: Flask
- Frontend: React (Vite)
- Retrieval: LangChain + FAISS
- Embeddings: HuggingFace sentence-transformers
- Parsing: PyPDF

## Features
- Upload PDF or text documents
- Index document chunks into a vector store
- Ask natural language questions
- Retrieve relevant context from uploaded documents

## Project Structure
```
ai-document-qa-system/
  backend/
    app.py
    requirements.txt
    services/
      ingest.py
      qa.py
  frontend/
    package.json
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
  .gitignore
  README.md
```

## Run Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on `http://localhost:5000` and frontend on `http://localhost:5173`.

## Sample Questions
- What is this document about?
- Summarize the main points.
- What does the document say about deadlines?
- List the key action items.

## Notes
This is a personal portfolio project and not employer code.

# ai-document-qa-system
RAG-based document Q&amp;A system using LangChain and HuggingFace embeddings, enabling natural language querying over large documents with contextually accurate responses.
>>>>>>> f600e1a51a921edb8aec23b2aa951ea71052f728
