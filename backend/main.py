import asyncio
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth,users,setup
from contextlib import asynccontextmanager
from dotenv.main import load_dotenv

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
	# Run at startup
	asyncio.create_task(setup.create_service())
	yield
	# Run on shutdown (if required)
	print('It is shutting down...')

app = FastAPI(lifespan=lifespan)

# CORS setup
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Routers
app.include_router(setup.router)
app.include_router(auth.router)
app.include_router(users.router)

