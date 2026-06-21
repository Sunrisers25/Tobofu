export const getCurrentUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_id')
  }
  return null
}

export const setCurrentUserId = (userId: string | number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_id', userId.toString())
  }
}

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_id')
  }
}
