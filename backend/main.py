from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# API Route
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
