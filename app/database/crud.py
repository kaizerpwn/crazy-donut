from app.database.db import connect_db

def get_all_topics():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id, topic, image_url FROM watercooler_topics")
    topics = [{"id": row[0], "topic": row[1], "image_url": row[2]} for row in cur.fetchall()]
    cur.close()
    conn.close()
    return topics

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