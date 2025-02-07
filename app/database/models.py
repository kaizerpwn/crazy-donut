from pydantic import BaseModel

class TopicCreate(BaseModel):
    topic: str
    image_url: str = None

class TopicUpdate(BaseModel):
    topic: str = None
    image_url: str = None

class TopicOut(BaseModel):
    id: int
    topic: str
    image_url: str = None

    class Config:
        from_attributes = True

class SlackSettingsUpdate(BaseModel):
    bot_token: str
    signing_secret: str
    channel_id: str
    giphy_api_key: str

class LoginRequest(BaseModel):
    username: str
    password: str
