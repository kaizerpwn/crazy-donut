from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from app.database.crud import get_slack_settings

slack_settings = get_slack_settings()
if slack_settings:
    SLACK_BOT_TOKEN = slack_settings['bot_token']
    SLACK_SIGNING_SECRET = slack_settings['signing_secret']
    CHANNEL_ID = slack_settings['channel_id']
else:
    raise ValueError("Slack settings not found in the database")

client = WebClient(token=SLACK_BOT_TOKEN)

def send_watercooler_topic(topic, image_url):
    try:
        client.chat_postMessage(
            channel=CHANNEL_ID,
            text=f"*Time for a Watercooler topic!* \n\n> {topic}",
            attachments=[{"image_url": image_url, "alt_text": "Watercooler topic image", "title": ""}] if image_url else None
        )
    except SlackApiError as e:
        print(f"Error sending message: {e.response['error']}")
