import mysql.connector
from app.config import DB_CONFIG

def connect_db(use_database=True):
    """Connect to MySQL, optionally without specifying a database."""
    config = DB_CONFIG.copy()
    if not use_database:
        config.pop("database", None)
    return mysql.connector.connect(**config)

def create_database():
    """Ensure the database and required tables exist."""
    conn = connect_db(use_database=False)
    cur = conn.cursor()

    database_name = DB_CONFIG["database"]

    cur.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")
    cur.close()
    conn.close()

    conn = connect_db(use_database=True)
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
