from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from app.config import SLACK_BOT_TOKEN, CHANNEL_ID

client = WebClient(token=SLACK_BOT_TOKEN)

def send_watercooler_topic(topic, image_url):
    try:
        client.chat_postMessage(
            channel=CHANNEL_ID,
            text=f"*Time for a Watercooler topic!* \n\n> {topic} 🤔",
            attachments=[{"image_url": image_url, "alt_text": "Watercooler topic image"}] if image_url else None
        )
        print("Message sent successfully!")
    except SlackApiError as e:
        print(f"Error sending message: {e.response['error']}")
