from fastapi import FastAPI, Request
from starlette.middleware.sessions import SessionMiddleware
from database import Base, engine
from fastapi.templating import Jinja2Templates
from controller import router
from contextlib import asynccontextmanager
from fastapi.staticfiles import StaticFiles

@asynccontextmanager
async def app_lifespan(app : FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan= app_lifespan, docs_url=None, redoc_url=None)
app.add_middleware(SessionMiddleware, secret_key = 'secret-key')
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(router)
