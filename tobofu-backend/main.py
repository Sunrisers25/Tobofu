import os
from datetime import datetime

from dotenv import load_dotenv

import cloudinary
import cloudinary.uploader

from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text, or_, func
from sqlalchemy.orm import Session

from database import engine, get_db
from models import (
    Base,
    User,
    Profile,
    Preference,
    Photo,
    Swipe,
    Match,
    Message,
    Notification
)
from schemas import (
    UserCreate,
    UserLogin,
    ProfileCreate,
    PreferenceCreate,
    PhotoCreate,
    SwipeCreate,
    MessageCreate,
    GoogleAuth
)

# ----------------------------
# Load Environment Variables
# ----------------------------
load_dotenv()

# ----------------------------
# Cloudinary Configuration
# ----------------------------
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# ----------------------------
# Create Tables
# ----------------------------
Base.metadata.create_all(bind=engine)

# ----------------------------
# Connection Manager (WebSockets)
# ----------------------------
class ConnectionManager:
    def __init__(self):
        # user_id -> list of active connections
        self.active_connections: dict[int, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
        # Notify others that user is online (optional broadcast)

    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            if websocket in self.active_connections[user_id]:
                self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_json(message)

manager = ConnectionManager()



# ----------------------------
# AI Compatibility Score Logic
# ----------------------------
def calculate_match_score(preference: Preference, profile: Profile, age: int) -> dict:
    if not preference or not profile:
        return {"score": 0, "breakdown": []}
    
    score = 0
    breakdown = []
    
    if preference.preferred_location and profile.location == preference.preferred_location:
        score += 25
        breakdown.append("Same Location")
    if preference.preferred_religion and profile.religion == preference.preferred_religion:
        score += 20
        breakdown.append("Same Religion")
    if preference.preferred_education and profile.education == preference.preferred_education:
        score += 15
        breakdown.append("Same Education")
    if preference.preferred_profession and profile.profession == preference.preferred_profession:
        score += 15
        breakdown.append("Same Profession")
    if age is not None and preference.min_age <= age <= preference.max_age:
        score += 25
        breakdown.append("Within Age Preference")
        
    return {"score": score, "breakdown": breakdown}

app = FastAPI()

# ----------------------------
# CORS Configuration
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# WebSocket Endpoint
# ----------------------------
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            # If a user is typing, route it to the intended recipient
            if data.get("type") == "typing":
                receiver_id = data.get("receiver_id")
                if receiver_id:
                    await manager.send_personal_message(
                        {"type": "typing", "sender_id": user_id}, 
                        int(receiver_id)
                    )
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)

# ----------------------------
# Home Route
# ----------------------------
@app.get("/")
def home():
    return {"message": "Tobofu Backend Running"}


# ----------------------------
# Database Test
# ----------------------------
@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "connected to neon"}


# ----------------------------
# Create User
# ----------------------------
@app.post("/user/create")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "User already exists",
            "user_id": existing_user.id
        }

    new_user = User(
        name=user.name,
        email=user.email,
        google_id=user.google_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }

# ----------------------------
# Login User
# ----------------------------
@app.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        # In a real app, verify password here
        return {
            "message": "User not found",
            "user_id": None
        }

    return {
        "message": "Login successful",
        "user_id": existing_user.id
    }


# ----------------------------
# Google OAuth Login/Register
# ----------------------------
@app.post("/auth/google")
def google_auth(
    data: GoogleAuth,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.google_id == data.google_id).first()
    is_new_user = False
    
    if not user:
        user = db.query(User).filter(User.email == data.email).first()
        if user:
            user.google_id = data.google_id
            db.commit()
            db.refresh(user)
        else:
            is_new_user = True
            user = User(
                name=data.name,
                email=data.email,
                google_id=data.google_id
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
    has_profile = False
    if not is_new_user:
        profile = db.query(Profile).filter(Profile.user_id == user.id).first()
        if profile:
            has_profile = True
            
    return {
        "user_id": user.id,
        "is_new_user": is_new_user,
        "has_profile": has_profile
    }

# ----------------------------
# Get All Users
# ----------------------------
@app.get("/users")
def get_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()


# ----------------------------
# Get User Profile
# ----------------------------
@app.get("/profile/{user_id}")
def get_user_profile(user_id: int, current_user_id: int = None, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    photo = db.query(Photo).filter(Photo.user_id == user_id).first()
    
    age = None
    if profile and profile.dob:
        try:
            birth_year = int(profile.dob.split("-")[0])
            age = datetime.now().year - birth_year
        except Exception:
            pass

    score = None
    breakdown = []
    if current_user_id:
        preference = db.query(Preference).filter(Preference.user_id == current_user_id).first()
        match_result = calculate_match_score(preference, profile, age)
        score = match_result["score"]
        breakdown = match_result["breakdown"]
        
        if current_user_id != user_id:
            # Check if recently notified? Or just send a notification
            viewer = db.query(User).filter(User.id == current_user_id).first()
            if viewer:
                notif = Notification(
                    user_id=user_id,
                    title="Profile Viewed",
                    message=f"{viewer.name} viewed your profile.",
                    type="PROFILE_VIEW"
                )
                db.add(notif)
                db.commit()

    return {
        "user_id": user_id,
        "name": user.name,
        "photo_url": photo.image_url if photo else None,
        "age": age,
        "location": profile.location if profile else None,
        "education": profile.education if profile else None,
        "profession": profile.profession if profile else None,
        "religion": profile.religion if profile else None,
        "community": profile.community if profile else None,
        "bio": profile.bio if profile else None,
        "compatibilityScore": score,
        "compatibilityBreakdown": breakdown
    }


# ----------------------------
# Create Profile
# ----------------------------
@app.post("/profile/create")
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    new_profile = Profile(
        user_id=profile.user_id,
        gender=profile.gender,
        dob=profile.dob,
        location=profile.location,
        education=profile.education,
        profession=profile.profession,
        religion=profile.religion,
        community=profile.community,
        bio=profile.bio
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully",
        "profile_id": new_profile.id
    }


# ----------------------------
# Create Preference
# ----------------------------
@app.post("/preference/create")
def create_preference(
    preference: PreferenceCreate,
    db: Session = Depends(get_db)
):

    new_preference = Preference(
        user_id=preference.user_id,
        min_age=preference.min_age,
        max_age=preference.max_age,
        preferred_location=preference.preferred_location,
        preferred_education=preference.preferred_education,
        preferred_profession=preference.preferred_profession,
        preferred_religion=preference.preferred_religion
    )

    db.add(new_preference)
    db.commit()
    db.refresh(new_preference)

    return {
        "message": "Preference created successfully",
        "preference_id": new_preference.id
    }


# ----------------------------
# Create Photo (Manual URL)
# ----------------------------
@app.post("/photo/create")
def create_photo(
    photo: PhotoCreate,
    db: Session = Depends(get_db)
):

    new_photo = Photo(
        user_id=photo.user_id,
        image_url=photo.image_url,
        is_primary=photo.is_primary
    )

    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)

    return {
        "message": "Photo created successfully",
        "photo_id": new_photo.id
    }


# ----------------------------
# Upload Photo to Cloudinary
# ----------------------------
@app.post("/photo/upload")
async def upload_photo(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    result = cloudinary.uploader.upload(file.file)

    image_url = result["secure_url"]

    new_photo = Photo(
        user_id=user_id,
        image_url=image_url,
        is_primary=False
    )

    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)

    return {
        "message": "Photo uploaded successfully",
        "photo_id": new_photo.id,
        "image_url": image_url
    }


# ----------------------------
# Get Matches
# ----------------------------
@app.get("/matches/{user_id}")
def get_matches(
    user_id: int,
    db: Session = Depends(get_db)
):

    preference = db.query(Preference).filter(
        Preference.user_id == user_id
    ).first()

    if not preference:
        return {
            "message": "Preferences not found"
        }

    profiles = db.query(Profile).filter(
        Profile.user_id != user_id
    ).all()

    matches = []

    for profile in profiles:

        print(f"\nChecking User {profile.user_id}")

        try:
            birth_year = int(profile.dob.split("-")[0])
            age = datetime.now().year - birth_year
        except Exception as e:
            print("DOB Error:", e)
            continue

        print("Age:", age)
        print("Location:", profile.location)
        print("Education:", profile.education)
        print("Profession:", profile.profession)
        print("Religion:", profile.religion)

        if not (
            preference.min_age <= age <= preference.max_age
        ):
            print("❌ Failed Age")
            continue

        if (
            preference.preferred_location
            and profile.location != preference.preferred_location
        ):
            print("❌ Failed Location")
            continue

        if (
            preference.preferred_education
            and profile.education != preference.preferred_education
        ):
            print("❌ Failed Education")
            continue

        if (
            preference.preferred_profession
            and profile.profession != preference.preferred_profession
        ):
            print("❌ Failed Profession")
            continue

        if (
            preference.preferred_religion
            and profile.religion != preference.preferred_religion
        ):
            print("❌ Failed Religion")
            continue

        user = db.query(User).filter(
            User.id == profile.user_id
        ).first()

        photo = db.query(Photo).filter(
            Photo.user_id == profile.user_id
        ).first()

        print("✅ MATCH FOUND")

        match_result = calculate_match_score(preference, profile, age)

        matches.append({
            "user_id": profile.user_id,
            "name": user.name if user else "",
            "age": age,
            "gender": profile.gender,
            "location": profile.location,
            "education": profile.education,
            "profession": profile.profession,
            "religion": profile.religion,
            "community": profile.community,
            "bio": profile.bio,
            "photo_url": photo.image_url if photo else None,
            "compatibilityScore": match_result["score"],
            "compatibilityBreakdown": match_result["breakdown"]
        })

    return {
        "total_matches": len(matches),
        "matches": matches
    }
# ----------------------------
# Swipe User
# ----------------------------
@app.post("/swipe")
def swipe_user(
    swipe: SwipeCreate,
    db: Session = Depends(get_db)
):
    print("\n====================")
    print("SWIPE REQUEST")
    print("FROM:", swipe.from_user_id)
    print("TO:", swipe.to_user_id)
    print("ACTION:", swipe.action)
    print("====================")

    new_swipe = Swipe(
        from_user_id=int(swipe.from_user_id),
        to_user_id=int(swipe.to_user_id),
        action=swipe.action
    )

    db.add(new_swipe)
    db.commit()

    print("Swipe saved")

    if swipe.action == "like":

        reverse_swipe = db.query(Swipe).filter(
            Swipe.from_user_id == int(swipe.to_user_id),
            Swipe.to_user_id == int(swipe.from_user_id),
            Swipe.action == "like"
        ).first()

        print("Reverse swipe:", reverse_swipe)

        if reverse_swipe:

            print("Reciprocal like found")

            u1 = min(
                int(swipe.from_user_id),
                int(swipe.to_user_id)
            )

            u2 = max(
                int(swipe.from_user_id),
                int(swipe.to_user_id)
            )

            existing_match = db.query(Match).filter(
                Match.user1_id == u1,
                Match.user2_id == u2
            ).first()

            print("Existing match:", existing_match)

            if not existing_match:

                new_match = Match(
                    user1_id=u1,
                    user2_id=u2
                )

                db.add(new_match)
                db.commit()

                print("NEW MATCH CREATED")
                
                # Create NEW_MATCH notifications
                user1 = db.query(User).filter(User.id == u1).first()
                user2 = db.query(User).filter(User.id == u2).first()
                if user1 and user2:
                    notif1 = Notification(
                        user_id=u1,
                        title="New Match!",
                        message=f"You matched with {user2.name}.",
                        type="NEW_MATCH"
                    )
                    notif2 = Notification(
                        user_id=u2,
                        title="New Match!",
                        message=f"You matched with {user1.name}.",
                        type="NEW_MATCH"
                    )
                    db.add(notif1)
                    db.add(notif2)
                    db.commit()

                return {"matched": True}

    return {"matched": False}

# ----------------------------
# Get My Matches
# ----------------------------
@app.get("/my-matches/{user_id}")
def my_matches(
    user_id: int,
    db: Session = Depends(get_db)
):

    matches = db.query(Match).filter(
        (Match.user1_id == user_id) |
        (Match.user2_id == user_id)
    ).all()

    preference = db.query(Preference).filter(Preference.user_id == user_id).first()

    result = []

    for match in matches:

        other_user_id = (
            match.user2_id
            if match.user1_id == user_id
            else match.user1_id
        )

        user = db.query(User).filter(
            User.id == other_user_id
        ).first()

        photo = db.query(Photo).filter(
            Photo.user_id == other_user_id
        ).first()

        profile = db.query(Profile).filter(
            Profile.user_id == other_user_id
        ).first()

        age = None
        if profile and profile.dob:
            try:
                birth_year = int(profile.dob.split("-")[0])
                age = datetime.now().year - birth_year
            except Exception:
                pass

        match_result = calculate_match_score(preference, profile, age)

        result.append({
            "user_id": other_user_id,
            "name": user.name if user else "",
            "photo_url": photo.image_url if photo else None,
            "location": profile.location if profile else "Unknown",
            "profession": profile.profession if profile else "Unknown",
            "compatibilityScore": match_result["score"],
            "compatibilityBreakdown": match_result["breakdown"],
            "matched_at": match.matched_at
        })

    return {"matches": result}
# ----------------------------
# Send Message
# ----------------------------
@app.post("/messages/send")
def send_message(
    data: MessageCreate,
    db: Session = Depends(get_db)
):
    new_message = Message(
        sender_id=data.sender_id,
        receiver_id=data.receiver_id,
        message=data.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    # Broadcast message via WebSocket if receiver is connected
    import asyncio
    try:
        # Create an event loop explicitly or use the existing one to run the async func in synchronous route
        loop = asyncio.get_event_loop()
        message_data = {
            "type": "new_message",
            "message": {
                "id": new_message.id,
                "sender_id": new_message.sender_id,
                "receiver_id": new_message.receiver_id,
                "message": new_message.message,
                "is_read": new_message.is_read,
                "created_at": new_message.created_at.isoformat() if new_message.created_at else None
            }
        }
        if loop.is_running():
            asyncio.create_task(manager.send_personal_message(message_data, data.receiver_id))
        else:
            loop.run_until_complete(manager.send_personal_message(message_data, data.receiver_id))
    except Exception as e:
        print("WebSocket broadcast failed:", e)

    # Create NEW_MESSAGE notification
    sender = db.query(User).filter(User.id == data.sender_id).first()
    if sender:
        notif = Notification(
            user_id=data.receiver_id,
            title="New Message",
            message=f"{sender.name} sent you a message.",
            type="NEW_MESSAGE"
        )
        db.add(notif)
        db.commit()

    return {
        "success": True,
        "message_id": new_message.id
    }
# ----------------------------
# Get Conversation
# ----------------------------
@app.get("/messages/{user1_id}/{user2_id}")
def get_messages(
    user1_id: int,
    user2_id: int,
    db: Session = Depends(get_db)
):
    messages = db.query(Message).filter(
        or_(
            (Message.sender_id == user1_id) &
            (Message.receiver_id == user2_id),

            (Message.sender_id == user2_id) &
            (Message.receiver_id == user1_id)
        )
    ).order_by(Message.created_at.asc()).all()

    return [
        {
            "id": msg.id,
            "sender_id": msg.sender_id,
            "receiver_id": msg.receiver_id,
            "message": msg.message,
            "created_at": msg.created_at
        }
        for msg in messages
    ]

# ----------------------------
# Get Unread Message Counts
# ----------------------------
@app.get("/messages/unread/{user_id}")
def get_unread_messages(user_id: int, db: Session = Depends(get_db)):
    unread_counts = db.query(
        Message.sender_id.label("from_user_id"),
        func.count(Message.id).label("count")
    ).filter(
        Message.receiver_id == user_id,
        Message.is_read == False
    ).group_by(Message.sender_id).all()
    
    return [
        {"from_user_id": row.from_user_id, "count": row.count}
        for row in unread_counts
    ]

# ----------------------------
# Mark Messages Read
# ----------------------------
@app.patch("/messages/read/{user1_id}/{user2_id}")
def mark_messages_read(user1_id: int, user2_id: int, db: Session = Depends(get_db)):
    messages = db.query(Message).filter(
        Message.receiver_id == user1_id,
        Message.sender_id == user2_id,
        Message.is_read == False
    ).all()
    
    for message in messages:
        message.is_read = True
        
    db.commit()
    
    return {"message": "Messages marked as read"}

# ----------------------------
# Notifications
# ----------------------------
@app.get("/notifications/{user_id}")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    notifications = db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(Notification.created_at.desc()).all()
    
    return notifications

@app.patch("/notifications/read/{notification_id}")
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    notif = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notif.is_read = True
    db.commit()
    
    return {"message": "Notification marked as read"}