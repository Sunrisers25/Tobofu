import axios from 'axios'

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

export const createUser = async (data: { name: string; email: string; google_id: string }) => {
  const response = await api.post('/user/create', data)
  return response.data
}

export const loginUser = async (data: { email: string; password?: string }) => {
  const response = await api.post('/login', data)
  return response.data
}

export const createProfile = async (data: {
  user_id: number;
  gender: string;
  dob: string;
  location: string;
  education: string;
  profession: string;
  religion: string;
  community: string;
  bio: string;
}) => {
  const response = await api.post('/profile/create', data)
  return response.data
}

export const createPreference = async (data: {
  user_id: number;
  min_age: number;
  max_age: number;
  preferred_location: string;
  preferred_education: string;
  preferred_profession: string;
  preferred_religion: string;
}) => {
  const response = await api.post('/preference/create', data)
  return response.data
}

export const uploadPhoto = async (data: FormData) => {
  const response = await api.post('/photo/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getMatches = async (userId: string | number) => {
  const response = await api.get(`/matches/${userId}`)
  return response.data
}

export const swipeUser = async (data: { from_user_id: string | number; to_user_id: string | number; action: 'like' | 'pass' }) => {
  const response = await api.post('/swipe', data)
  return response.data
}

export const getMyMatches = async (userId: string | number) => {
  const response = await api.get(`/my-matches/${userId}`)
  return response.data
}

export const getProfile = async (userId: string | number, currentUserId?: string | number) => {
  const url = currentUserId 
    ? `/profile/${userId}?current_user_id=${currentUserId}`
    : `/profile/${userId}`
  const response = await api.get(url)
  return response.data
}

export default api
export const sendMessage = async (data: {
  sender_id: number
  receiver_id: number
  message: string
}) => {
  const response = await api.post('/messages/send', data)
  return response.data
}

export const getMessages = async (
  user1Id: number,
  user2Id: number
) => {
  const response = await api.get(
    `/messages/${user1Id}/${user2Id}`
  )
  return response.data
}

export const getUnreadCounts = async (userId: string | number) => {
  const response = await api.get(`/messages/unread/${userId}`)
  return response.data
}

export const markMessagesRead = async (user1Id: string | number, user2Id: string | number) => {
  const response = await api.patch(`/messages/read/${user1Id}/${user2Id}`)
  return response.data
}

export const getNotifications = async (userId: string | number) => {
  const response = await api.get(`/notifications/${userId}`)
  return response.data
}

export const markNotificationRead = async (notificationId: string | number) => {
  const response = await api.patch(`/notifications/read/${notificationId}`)
  return response.data
}