from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

CAZETV_DATA = {
    "hero": {
        "title": "AO VIVO COM IMAGENS: BRASIL X ARGENTINA",
        "subtitle": "A Grande Final Exclusiva na CazéTV",
        "viewers": "1.5M",
        "thumbnail": "https://images.unsplash.com/photo-1518605368461-1ee1ceca70d7?q=80&w=2000&auto=format&fit=crop"
    },
    "videos": [
        {
            "id": "1",
            "title": "O MAIOR GOL DA HISTÓRIA DA COMPETIÇÃO",
            "views": "2.1M",
            "time": "há 2 dias",
            "thumbnail": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop",
            "duration": "10:24"
        },
        {
            "id": "2",
            "title": "CAZÉ REAGE: PIORES COMENTÁRIOS DA LIVE",
            "views": "980K",
            "time": "há 4 dias",
            "thumbnail": "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=600&auto=format&fit=crop",
            "duration": "24:15"
        },
        {
            "id": "3",
            "title": "BASTIDORES - A LOUCURA DO ESTÚDIO",
            "views": "500K",
            "time": "há 1 semana",
            "thumbnail": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop",
            "duration": "15:40"
        },
        {
            "id": "4",
            "title": "ANÁLISE TÁTICA DO JOGO",
            "views": "300K",
            "time": "há 2 semanas",
            "thumbnail": "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=600&auto=format&fit=crop",
            "duration": "08:12"
        },
        {
            "id": "5",
            "title": "PRÉ-JOGO: EXPECTATIVAS A MIL",
            "views": "1.2M",
            "time": "há 3 semanas",
            "thumbnail": "https://images.unsplash.com/photo-1518091043644-c1d44570a2c9?q=80&w=600&auto=format&fit=crop",
            "duration": "45:00"
        }
    ]
}

@app.get("/api/cazetv")
def get_cazetv_data():
    return CAZETV_DATA

@app.get("/api/hello")
def read_hello():
    return {"message": "Olá do backend FastAPI!"}

# Serve static files from React build if they exist
frontend_build_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_build_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_build_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Serve index.html for all other routes to support React Router
        return FileResponse(os.path.join(frontend_build_path, "index.html"))
