import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
from models import User, Profile, Notification, Message, Match

db = SessionLocal()

# We can query all users
users = db.query(User).all()
print("Current Users:")
for u in users:
    print(f"ID: {u.id}, Name: {u.name}, Email: {u.email}, Google ID: {u.google_id}")

# Close DB
db.close()
