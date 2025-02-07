import mysql.connector
from app.config import DB_CONFIG

def connect_db():
    return mysql.connector.connect(**DB_CONFIG)

def create_database():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS watercooler_topics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            topic TEXT NOT NULL,
            image_url TEXT,
            sent_at TIMESTAMP NULL DEFAULT NULL
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS slack_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            bot_token TEXT,
            signing_secret TEXT,
            channel_id TEXT,
            giphy_api_key TEXT
        )
    """)
    cur.execute("SELECT COUNT(*) FROM slack_settings")
    count = cur.fetchone()[0]
    if count == 0:
        cur.execute("""
            INSERT INTO slack_settings (bot_token, signing_secret, channel_id, giphy_api_key)
            VALUES (NULL, NULL, NULL, NULL)
        """)
    conn.commit()
    cur.close()
    conn.close()

