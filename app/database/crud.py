from app.database.db import connect_db 

def get_all_topics():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id, topic, image_url, sent_at FROM watercooler_topics ORDER BY id DESC")
    topics = [{"id": row[0], "topic": row[1], "image_url": row[2], "sent_at": row[3]} for row in cur.fetchall()]
    cur.close()
    conn.close()
    return topics

def get_topic_by_id(topic_id: int):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id, topic, image_url, sent_at FROM watercooler_topics WHERE id = %s", (topic_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        return {"id": row[0], "topic": row[1], "image_url": row[2], "sent_at": row[3]}
    return None

def add_topic(topic, image_url):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO watercooler_topics (topic, image_url) VALUES (%s, %s)", (topic, image_url))
    conn.commit()
    cur.close()
    conn.close()

def update_topic(topic_id: int, topic: str, image_url: str = None):
    conn = connect_db()
    cur = conn.cursor()
    
    cur.execute("SELECT id FROM watercooler_topics WHERE id = %s", (topic_id,))
    if not cur.fetchone():
        cur.close()
        conn.close()
        raise ValueError("Topic not found")  
 
    update_fields = []
    values = []
 
    if topic:
        update_fields.append("topic = %s")
        values.append(topic)
     
    if image_url:
        update_fields.append("image_url = %s")
        values.append(image_url)

    values.append(topic_id)
    
    query = f"UPDATE watercooler_topics SET {', '.join(update_fields)} WHERE id = %s"
    cur.execute(query, values)
    conn.commit()

    cur.close()
    conn.close()

def delete_topic(topic_id: int):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM watercooler_topics WHERE id = %s", (topic_id,))
    if not cur.fetchone():
        cur.close()
        conn.close()
        raise ValueError("Topic not found")
    
    cur.execute("DELETE FROM watercooler_topics WHERE id = %s", (topic_id,))
    conn.commit()

    cur.close()
    conn.close()


def get_unsent_latest_topic():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id, topic, image_url FROM watercooler_topics WHERE sent_at IS NULL ORDER BY id DESC LIMIT 1")
    row = cur.fetchone()
    cur.close()
    conn.close()
    
    if row:
        return {"id": row[0], "topic": row[1], "image_url": row[2]}
    return None

def mark_topic_as_sent(topic_id: int):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("UPDATE watercooler_topics SET sent_at = CURRENT_TIMESTAMP WHERE id = %s", (topic_id,))
    conn.commit()
    cur.close()
    conn.close()

def get_slack_settings():
    conn = connect_db()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT bot_token, signing_secret, channel_id FROM slack_settings LIMIT 1")
    settings = cur.fetchone()
    cur.close()
    conn.close()
    return settings

def update_slack_settings(bot_token: str, signing_secret: str, channel_id: str):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE slack_settings
        SET bot_token = %s, signing_secret = %s, channel_id = %s
        WHERE id = 1
    """, (bot_token, signing_secret, channel_id))
    conn.commit()
    cur.close()
    conn.close()