from app.database.db import create_database
create_database()

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router
from app.scheduler.job import scheduler
from app.database.crud import get_slack_settings
from app.config import SERVER_PORT, FRONTEND_URL

app = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

slack_settings = get_slack_settings()
if slack_settings:
    SLACK_BOT_TOKEN = slack_settings['bot_token']
    SLACK_SIGNING_SECRET = slack_settings['signing_secret']
    CHANNEL_ID = slack_settings['channel_id']
else:
    raise ValueError("Slack settings not found in the database")

scheduler.start()

if __name__ == "__main__": 
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(SERVER_PORT),
        forwarded_allow_ips="*",
        proxy_headers=True,
        server_header=False
    )