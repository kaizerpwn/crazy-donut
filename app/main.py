import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router
from app.scheduler.job import scheduler
from app.database.db import create_database

app = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

create_database()

if __name__ == "__main__": 
    uvicorn.run(app, host="0.0.0.0", port=8000)