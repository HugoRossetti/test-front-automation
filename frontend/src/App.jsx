import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Conectando ao servidor...')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate a slight delay to show the animation
    const timer = setTimeout(() => {
      fetch('/api/hello')
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok')
          return response.json()
        })
        .then(data => {
          setMessage(data.message)
          setIsConnected(true)
        })
        .catch(err => {
          setMessage('Erro ao conectar na API.')
          setIsConnected(false)
        })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app-container">
      <div className="glass-card">
        <div className="header">
          <h1>React & FastAPI</h1>
          <p>Ambiente Moderno de Integração</p>
        </div>
        
        <div className="data-display">
          <div className="status-badge">
            <span className={`status-dot ${isConnected ? 'connected' : ''}`}></span>
            {isConnected ? 'API Conectada' : 'Aguardando API'}
          </div>
          
          <div className="message-box">
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
