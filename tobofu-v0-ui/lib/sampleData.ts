import { Profile, Match, Message, Conversation, Notification } from './types'

export const sampleProfiles: Profile[] = [
  {
    id: '1',
    name: 'Priya',
    age: 26,
    location: 'Mumbai, India',
    education: 'MBA from IIM-A',
    profession: 'Product Manager at Tech Startup',
    religion: 'Hindu',
    community: 'Brahmin',
    bio: 'Adventure seeker, love hiking and reading. Looking for someone who values growth and meaningful conversations.',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
    ],
    compatibilityScore: 92,
    matchDate: '2 days ago',
    onlineStatus: 'online',
    verified: true
  },
  {
    id: '2',
    name: 'Anjali',
    age: 24,
    location: 'Delhi, India',
    education: 'B.Tech from BITS',
    profession: 'Software Engineer',
    religion: 'Hindu',
    community: 'Jain',
    bio: 'Coffee lover, movie buff. Believe in making the most of every moment.',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=500&h=600&fit=crop'
    ],
    compatibilityScore: 88,
    matchDate: '5 days ago',
    onlineStatus: 'offline'
  },
  {
    id: '3',
    name: 'Neha',
    age: 25,
    location: 'Bangalore, India',
    education: 'MS from Cornell',
    profession: 'Data Scientist',
    religion: 'Hindu',
    community: 'Marathi',
    bio: 'Passionate about technology and travel. Love exploring new cuisines.',
    photos: [
      'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=600&fit=crop'
    ],
    compatibilityScore: 85,
    onlineStatus: 'online',
    verified: true
  }
]

export const sampleMatches: Match[] = [
  {
    id: 'match-1',
    profile: sampleProfiles[0],
    compatibilityScore: 92,
    matchedAt: '2025-01-17T10:30:00Z',
    mutualMatch: true
  },
  {
    id: 'match-2',
    profile: sampleProfiles[1],
    compatibilityScore: 88,
    matchedAt: '2025-01-16T14:45:00Z',
    mutualMatch: true
  },
  {
    id: 'match-3',
    profile: sampleProfiles[2],
    compatibilityScore: 85,
    matchedAt: '2025-01-15T09:15:00Z',
    mutualMatch: false
  }
]

export const sampleMessages: Message[] = [
  {
    id: 'msg-1',
    fromUserId: '1',
    toUserId: 'current-user',
    content: 'Hi! I noticed we have a lot in common. How are you doing?',
    timestamp: '2025-01-19T10:30:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-2',
    fromUserId: 'current-user',
    toUserId: '1',
    content: 'Hey Priya! I\&apos;m doing great, thanks for reaching out!',
    timestamp: '2025-01-19T10:35:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-3',
    fromUserId: '1',
    toUserId: 'current-user',
    content: 'Have you traveled to any interesting places lately?',
    timestamp: '2025-01-19T10:40:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-4',
    fromUserId: 'current-user',
    toUserId: '1',
    content: 'Yes! Just got back from Goa. The beaches were amazing.',
    timestamp: '2025-01-19T10:45:00Z',
    read: true,
    type: 'text'
  }
]

export const sampleConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [sampleProfiles[0]],
    lastMessage: {
      id: 'msg-4',
      fromUserId: 'current-user',
      toUserId: '1',
      content: 'Yes! Just got back from Goa. The beaches were amazing.',
      timestamp: '2025-01-19T10:45:00Z',
      read: true
    },
    unreadCount: 0,
    updatedAt: '2025-01-19T10:45:00Z'
  },
  {
    id: 'conv-2',
    participants: [sampleProfiles[1]],
    lastMessage: {
      id: 'msg-5',
      fromUserId: '2',
      toUserId: 'current-user',
      content: 'That sounds wonderful! 😊',
      timestamp: '2025-01-18T15:20:00Z',
      read: false
    },
    unreadCount: 1,
    updatedAt: '2025-01-18T15:20:00Z'
  },
  {
    id: 'conv-3',
    participants: [sampleProfiles[2]],
    lastMessage: {
      id: 'msg-6',
      fromUserId: 'current-user',
      toUserId: '3',
      content: 'Let\&apos;s chat more when you\&apos;re free!',
      timestamp: '2025-01-17T08:00:00Z',
      read: true
    },
    unreadCount: 0,
    updatedAt: '2025-01-17T08:00:00Z'
  }
]

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    fromProfile: { id: '10', name: 'Divya', age: 23 },
    timestamp: '2025-01-19T14:30:00Z',
    read: false,
    actionUrl: '/matches'
  },
  {
    id: 'notif-2',
    type: 'message',
    fromProfile: { id: '1', name: 'Priya', age: 26 },
    timestamp: '2025-01-19T10:45:00Z',
    read: true,
    actionUrl: '/messages'
  },
  {
    id: 'notif-3',
    type: 'visitor',
    fromProfile: { id: '11', name: 'Sakshi', age: 25 },
    timestamp: '2025-01-18T16:00:00Z',
    read: false,
    actionUrl: '/discover'
  }
]

export const sampleCurrentUser: Profile = {
  id: 'current-user',
  name: 'Rahul',
  age: 28,
  location: 'Bangalore, India',
  education: 'B.Tech from NIT',
  profession: 'Software Architect',
  religion: 'Hindu',
  community: 'Tamil',
  bio: 'Tech enthusiast with a passion for travel. Let\&apos;s explore the world together.',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
  ],
  compatibilityScore: 0,
  onlineStatus: 'online',
  verified: true
}

export const allProfiles: Profile[] = [
  ...sampleProfiles,
  {
    id: '4',
    name: 'Akshata',
    age: 27,
    location: 'Chennai, India',
    education: 'M.Sc Computer Science',
    profession: 'ML Engineer',
    religion: 'Hindu',
    community: 'Kannada',
    bio: 'Bookworm with a keen interest in AI. Love yoga and meditation.',
    photos: [
      'https://images.unsplash.com/photo-1516815231560-8f41ec9ac8cb?w=500&h=600&fit=crop'
    ],
    compatibilityScore: 82,
    onlineStatus: 'offline'
  },
  {
    id: '5',
    name: 'Medha',
    age: 26,
    location: 'Pune, India',
    education: 'MBA from ISB',
    profession: 'Management Consultant',
    religion: 'Hindu',
    community: 'Marathi',
    bio: 'Ambitious, driven, and looking for a partner with similar goals.',
    photos: [
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=500&h=600&fit=crop'
    ],
    compatibilityScore: 79,
    onlineStatus: 'online'
  }
]
