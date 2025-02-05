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
    conn.commit()
    cur.close()
    conn.close()
