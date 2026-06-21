export interface Profile {
  id: string
  name: string
  age: number
  location: string
  education: string
  profession: string
  religion: string
  community: string
  bio: string
  photos: string[]
  compatibilityScore: number
  compatibilityBreakdown?: string[]
  matchDate?: string
  onlineStatus?: 'online' | 'offline'
  verified?: boolean
  photo_url?: string
  user_id?: string | number
}

export interface Match {
  id: string
  profile: Profile
  compatibilityScore: number
  matchedAt: string
  mutualMatch?: boolean
}

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  content: string
  timestamp: string
  read: boolean
  type?: 'text' | 'image' | 'system'
}

export interface Conversation {
  id: string
  participants: Profile[]
  lastMessage?: Message
  unreadCount?: number
  updatedAt: string
}

export interface Notification {
  id: string
  type: 'like' | 'match' | 'message' | 'visitor' | 'message_request'
  fromProfile: Partial<Profile>
  timestamp: string
  read: boolean
  actionUrl?: string
}

export interface ProfilePreferences {
  ageMin: number
  ageMax: number
  preferredLocations: string[]
  preferredEducation: string[]
  preferredProfession: string[]
  preferredReligion: string[]
  preferredCommunity: string[]
  heightMin?: number
  heightMax?: number
}

export interface User {
  id: string
  email: string
  profile: Profile
  preferences: ProfilePreferences
  profileCompleteness: number
  createdAt: string
  lastActive: string
}
