'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { googleAuth } from '@/lib/api'
import { setCurrentUserId } from '@/lib/auth'

interface GoogleJwtPayload {
  sub: string
  email: string
  name: string
  picture?: string
}

export function GoogleAuthButton() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential)
      
      const response = await googleAuth({
        google_id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        photo_url: decoded.picture
      })

      if (response.user_id) {
        setCurrentUserId(response.user_id.toString())
        
        if (response.is_new_user || !response.has_profile) {
          router.push('/profile-setup')
        } else {
          router.push('/discover')
        }
      } else {
        setError('Google login failed.')
      }
    } catch (err) {
      console.error('Google Auth Error:', err)
      setError('An error occurred during Google authentication.')
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            setError('Google login cancelled or failed.')
          }}
          theme="outline"
          size="large"
          shape="rectangular"
          text="continue_with"
        />
      </GoogleOAuthProvider>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}
