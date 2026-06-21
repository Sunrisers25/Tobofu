from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Text
from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    google_id = Column(String, unique=True)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    gender = Column(String)
    dob = Column(String)
    location = Column(String)

    education = Column(String)
    profession = Column(String)

    religion = Column(String)
    community = Column(String)

    bio = Column(String)


class Preference(Base):
    __tablename__ = "preferences"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    min_age = Column(Integer)
    max_age = Column(Integer)

    preferred_location = Column(String)
    preferred_education = Column(String)
    preferred_profession = Column(String)
    preferred_religion = Column(String)


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    image_url = Column(String)
    is_primary = Column(Boolean, default=False)


class Swipe(Base):
    __tablename__ = "swipes"

    id = Column(Integer, primary_key=True, index=True)

    from_user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    to_user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    action = Column(String)


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True)

    user1_id = Column(Integer)

    user2_id = Column(Integer)

    matched_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    sender_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))

    message = Column(Text)

    is_read = Column(Boolean, default=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(String)
    type = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)