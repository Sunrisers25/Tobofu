export interface UserCreateRequest {
  name: string;
  email: string;
  google_id: string;
}

export interface ProfileCreateRequest {
  user_id: number;
  gender: string;
  dob: string;
  location: string;
  education: string;
  profession: string;
  religion: string;
  community: string;
  bio: string;
}

export interface PreferenceCreateRequest {
  user_id: number;
  min_age: number;
  max_age: number;
  preferred_location: string;
  preferred_education: string;
  preferred_profession: string;
  preferred_religion: string;
}

export interface SwipeRequest {
  from_user_id: number;
  to_user_id: number;
  action: "like" | "pass";
}

export interface User {
  id: number;
  name: string;
  email: string;
  google_id?: string;
  created_at?: string;
}

export interface Profile {
  id: number;
  user_id: number;
  gender: string;
  dob: string;
  location: string;
  education: string;
  profession: string;
  religion: string;
  community: string;
  bio: string;
  profile_picture?: string;
}

export interface MatchProfile {
  user_id: number;
  name: string;
  age?: number;
  gender?: string;
  location?: string;
  education?: string;
  profession?: string;
  religion?: string;
  community?: string;
  bio?: string;
  photo_url: string | null;
  matched_at?: string;
}
