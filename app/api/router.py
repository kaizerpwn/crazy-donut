from fastapi import APIRouter, HTTPException
from app.database.models import TopicCreate, TopicUpdate, SlackSettingsUpdate
from app.database.crud import add_topic, update_topic, delete_topic, get_all_topics, get_topic_by_id, get_unsent_latest_topic, mark_topic_as_sent, get_slack_settings, update_slack_settings
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

@router.get("/topics/send-latest/")
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

@router.put("/topics/{topic_id}/send")
def send_topic(topic_id: int): 
    topic = get_topic_by_id(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
     
    try:
        send_watercooler_topic(topic['topic'], topic['image_url']) 
        mark_topic_as_sent(topic_id) 
        return {"message": "Topic sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send topic: {str(e)}")
    
@router.get("/slack-settings/")
def get_slack_settings_route():
    settings = get_slack_settings()
    if not settings:
        raise HTTPException(status_code=404, detail="Slack settings not found")
    return settings


@router.put("/slack-settings/")
def update_slack_settings_route(settings: SlackSettingsUpdate):
    try:
        update_slack_settings(settings.bot_token, settings.signing_secret, settings.channel_id)
        return {"message": "Slack settings updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update Slack settings: {str(e)}")