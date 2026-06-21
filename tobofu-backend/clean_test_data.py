import sys
import os
from sqlalchemy import or_

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
from models import User, Profile, Preference, Photo, Swipe, Match, Message, Notification

def clean_test_data():
    db = SessionLocal()
    try:
        # Find test users
        test_users = db.query(User).filter(User.email.like('%@test.com%')).all()
        test_user_ids = [u.id for u in test_users]
        
        if not test_user_ids:
            print("No test users found to delete.")
            return

        print(f"Found test users to delete: {test_user_ids}")

        # Delete related records
        
        # 1. Notifications
        db.query(Notification).filter(Notification.user_id.in_(test_user_ids)).delete(synchronize_session=False)
        
        # 2. Messages
        db.query(Message).filter(or_(
            Message.sender_id.in_(test_user_ids),
            Message.receiver_id.in_(test_user_ids)
        )).delete(synchronize_session=False)
        
        # 3. Matches
        db.query(Match).filter(or_(
            Match.user1_id.in_(test_user_ids),
            Match.user2_id.in_(test_user_ids)
        )).delete(synchronize_session=False)
        
        # 4. Swipes
        db.query(Swipe).filter(or_(
            Swipe.from_user_id.in_(test_user_ids),
            Swipe.to_user_id.in_(test_user_ids)
        )).delete(synchronize_session=False)
        
        # 5. Photos
        db.query(Photo).filter(Photo.user_id.in_(test_user_ids)).delete(synchronize_session=False)
        
        # 6. Preferences
        db.query(Preference).filter(Preference.user_id.in_(test_user_ids)).delete(synchronize_session=False)
        
        # 7. Profiles
        db.query(Profile).filter(Profile.user_id.in_(test_user_ids)).delete(synchronize_session=False)
        
        # 8. Finally, delete the test users
        db.query(User).filter(User.id.in_(test_user_ids)).delete(synchronize_session=False)
        
        db.commit()
        print("Successfully deleted test users and all associated mock data.")
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    clean_test_data()
