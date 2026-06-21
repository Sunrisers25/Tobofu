from pydantic import BaseModel


# ----------------------------
# User
# ----------------------------
class UserCreate(BaseModel):
    name: str
    email: str
    google_id: str


class GoogleAuth(BaseModel):
    google_id: str
    email: str
    name: str
    photo_url: str | None = None


class UserLogin(BaseModel):
    email: str
    password: str


# ----------------------------
# Profile
# ----------------------------
class ProfileCreate(BaseModel):
    user_id: int
    gender: str
    dob: str
    location: str
    education: str
    profession: str
    religion: str
    community: str
    bio: str


# ----------------------------
# Preference
# ----------------------------
class PreferenceCreate(BaseModel):
    user_id: int
    min_age: int
    max_age: int
    preferred_location: str
    preferred_education: str
    preferred_profession: str
    preferred_religion: str


# ----------------------------
# Photo
# ----------------------------
class PhotoCreate(BaseModel):
    user_id: int
    image_url: str
    is_primary: bool = False


class SwipeCreate(BaseModel):
    from_user_id: int
    to_user_id: int
    action: str


# ----------------------------
# Message
# ----------------------------
class MessageCreate(BaseModel):
    sender_id: int
    receiver_id: int
    message: str