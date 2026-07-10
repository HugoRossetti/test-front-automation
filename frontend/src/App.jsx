import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cazetv')
      .then(res => res.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading || !data) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Carregando CazéTV...</h2>
      </div>
    )
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          CAZÉ<span>TV</span>
        </div>
      </nav>

      <header className="hero">
        <div 
          className="hero-bg" 
          style={{ backgroundImage: `url(${data.hero.thumbnail})` }}
        ></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="live-badge">
            <span className="pulse-dot"></span>
            AO VIVO AGORA - {data.hero.viewers} PESSOAS
          </div>
          <h1 className="hero-title">{data.hero.title}</h1>
          <p className="hero-subtitle">{data.hero.subtitle}</p>
          <button className="watch-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            ASSISTIR AGORA
          </button>
        </div>
      </header>

      <main className="video-section">
        <h2 className="section-title">Últimos Vídeos</h2>
        <div className="video-grid">
          {data.videos.map(video => (
            <article key={video.id} className="video-card">
              <div className="video-thumb-container">
                <img src={video.thumbnail} alt={video.title} className="video-thumb" />
                <span className="video-duration">{video.duration}</span>
              </div>
              <h3 className="video-card-title">{video.title}</h3>
              <div className="video-card-meta">
                {video.views} • {video.time}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
