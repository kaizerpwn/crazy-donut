from fastapi import APIRouter, HTTPException, Depends, Response
from app.database.models import TopicCreate, TopicUpdate, SlackSettingsUpdate, LoginRequest
from app.database.crud import add_topic, update_topic, delete_topic, get_all_topics, get_topic_by_id, get_unsent_latest_topic, mark_topic_as_sent, get_slack_settings, update_slack_settings
from app.slack.integration import send_watercooler_topic
from app.config import ADMIN_USERNAME, ADMIN_PASSWORD
from app.utils.auth import create_access_token, get_current_user

router = APIRouter()

def admin_user(username: str = Depends(get_current_user)):
    if username != ADMIN_USERNAME:
        raise HTTPException(status_code=403, detail="Not authorized")
    return username

@router.post("/login")
def login(response: Response, login_request: LoginRequest):
    if login_request.username != ADMIN_USERNAME or login_request.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": login_request.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return {"message": "Login successful"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logout successful"}

@router.post("/topics/", dependencies=[Depends(admin_user)])
def create_topic(topic_data: TopicCreate):
    add_topic(topic_data.topic, topic_data.image_url)
    return {"message": "Topic added successfully"}

@router.get("/topics/", dependencies=[Depends(admin_user)])
def get_topics():
    return get_all_topics()

@router.put("/topics/{topic_id}", dependencies=[Depends(admin_user)])
def update_topic_route(topic_id: int, topic_data: TopicUpdate):
    update_topic(topic_id, topic_data.topic, topic_data.image_url)
    return {"message": "Topic updated successfully"}

@router.delete("/topics/{topic_id}", dependencies=[Depends(admin_user)])
def delete_topic_route(topic_id: int):
    try:
        delete_topic(topic_id)
        return {"message": "Topic deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/topics/send-latest/", dependencies=[Depends(admin_user)])
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

@router.put("/topics/{topic_id}/send", dependencies=[Depends(admin_user)])
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
    
@router.get("/slack-settings/", dependencies=[Depends(admin_user)])
def get_slack_settings_route():
    settings = get_slack_settings()
    if not settings:
        raise HTTPException(status_code=404, detail="Slack settings not found")
    return settings

@router.put("/slack-settings/", dependencies=[Depends(admin_user)])
def update_slack_settings_route(settings: SlackSettingsUpdate):
    try:
        update_slack_settings(settings.bot_token, settings.signing_secret, settings.channel_id)
        return {"message": "Slack settings updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update Slack settings: {str(e)}")