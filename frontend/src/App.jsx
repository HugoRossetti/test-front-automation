import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Carregando...')

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Erro ao conectar na API: ' + err))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Teste React + FastAPI</h1>
      <p>Abaixo está a mensagem vinda do backend (via <code>/api/hello</code>):</p>
      <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <strong>{message}</strong>
      </div>
    </div>
  )
}

export default App
