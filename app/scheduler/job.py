from apscheduler.schedulers.background import BackgroundScheduler
from app.database.crud import get_all_topics
from app.slack.integration import send_watercooler_topic

scheduler = BackgroundScheduler()

def send_daily_topic():
    topic = get_all_topics()[0]
    if topic:
        send_watercooler_topic(topic['topic'], topic['image_url'])

scheduler.add_job(send_daily_topic, 'cron', hour=8, minute=0)
scheduler.start()
