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