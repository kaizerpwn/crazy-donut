import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router
from app.scheduler.job import scheduler
from app.database.db import create_database
from app.database.crud import get_slack_settings

app = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

create_database()

slack_settings = get_slack_settings()
if slack_settings:
    SLACK_BOT_TOKEN = slack_settings['bot_token']
    SLACK_SIGNING_SECRET = slack_settings['signing_secret']
    CHANNEL_ID = slack_settings['channel_id']
else:
    raise ValueError("Slack settings not found in the database")

if __name__ == "__main__": 
    uvicorn.run(app, host="0.0.0.0", port=8000)