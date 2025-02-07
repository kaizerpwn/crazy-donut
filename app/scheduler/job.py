from apscheduler.schedulers.background import BackgroundScheduler
from app.database.crud import get_unsent_latest_topic
from app.slack.integration import send_watercooler_topic

scheduler = BackgroundScheduler()

def send_daily_topic():
    topic = get_unsent_latest_topic()[0]
    if topic:
        send_watercooler_topic(topic['topic'], topic['image_url'])

scheduler.add_job(send_daily_topic, 'cron', hour=18, minute=20)
