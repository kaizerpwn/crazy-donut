from apscheduler.schedulers.background import BackgroundScheduler
from app.database.crud import get_unsent_latest_topic, mark_topic_as_sent
from app.slack.integration import send_watercooler_topic

scheduler = BackgroundScheduler()

def send_daily_topic():
    topic = get_unsent_latest_topic()
    if topic:
        send_watercooler_topic(topic['topic'], topic['image_url'])
        mark_topic_as_sent(topic['id'])

scheduler.add_job(send_daily_topic, 'cron', hour=8, minute=0)
