import { useState } from 'react'

export default function App() {
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('')

  const uploadFile = async () => {
    if (!file) {
      setStatus('Please choose a file first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    setStatus(data.message || data.error || 'Upload complete')
  }

  const askQuestion = async () => {
    const response = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const data = await response.json()
    setAnswer(data.answer || data.error || 'No response')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Document Q&A System</h1>
      <p>Upload a PDF or text file, then ask questions about it.</p>

      <div style={{ marginBottom: 20 }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={uploadFile} style={{ marginLeft: 12 }}>Upload</button>
      </div>

      {status && <p><strong>Status:</strong> {status}</p>}

      <div style={{ marginTop: 20 }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the uploaded document"
          style={{ width: '70%', padding: 8 }}
        />
        <button onClick={askQuestion} style={{ marginLeft: 12, padding: '8px 12px' }}>Ask</button>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Answer</h3>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
          {answer || 'Your answer will appear here.'}
        </pre>
      </div>
    </div>
  )
}
