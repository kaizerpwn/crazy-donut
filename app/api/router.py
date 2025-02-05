from fastapi import APIRouter, HTTPException
from app.database.models import TopicCreate, TopicUpdate
from app.database.crud import add_topic, update_topic, delete_topic, get_all_topics, get_unsent_latest_topic, mark_topic_as_sent
from app.slack.integration import send_watercooler_topic

router = APIRouter()

@router.post("/topics/")
def create_topic(topic_data: TopicCreate):
    add_topic(topic_data.topic, topic_data.image_url)
    return {"message": "Topic added successfully"}

@router.get("/topics/")
def get_topics():
    return get_all_topics()

@router.put("/topics/{topic_id}")
def update_topic_route(topic_id: int, topic_data: TopicUpdate):
    update_topic(topic_id, topic_data.topic, topic_data.image_url)
    return {"message": "Topic updated successfully"}

@router.delete("/topics/{topic_id}")
def delete_topic_route(topic_id: int):
    try:
        delete_topic(topic_id)
        return {"message": "Topic deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/send-latest-topic/")
def send_latest_topic(): 
    topic = get_unsent_latest_topic()
    
    if topic is None:
        raise HTTPException(status_code=404, detail="No unsent topics found")
     
    try:
        send_watercooler_topic(topic['topic'], topic['image_url']) 
        mark_topic_as_sent(topic['id'])
        return {"message": "Latest topic sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send topic: {str(e)}")
