'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Image as ImageIcon, UploadCloud, X } from 'lucide-react'
import { uploadPhoto } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'

export default function PhotoUploadPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<number | null>(null)
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = getCurrentUserId()
    if (!id) {
      router.push('/register')
    } else {
      setUserId(Number(id))
    }
  }, [router])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setError('')
      } else {
        setError('Please select a valid image file.')
      }
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!selectedFile) {
      setError('Please select a photo to upload.')
      return
    }

    if (!userId) {
      setError('User ID not found. Please register again.')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('user_id', userId.toString())
      formData.append('file', selectedFile)

      await uploadPhoto(formData)
      router.push('/discover')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload photo.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  if (userId === null) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Upload a Photo
        </h1>
        <p className="text-foreground/60">
          A great photo helps you stand out and get more matches.
        </p>
      </div>

      <div className="p-5 sm:p-8 rounded-2xl bg-card border border-muted premium-shadow space-y-6">
        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl p-8 bg-background relative overflow-hidden transition-colors hover:border-primary/50">
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="p-3 bg-white text-black rounded-full hover:bg-white/90 shadow-lg flex items-center gap-2"
                  >
                    <X className="w-5 h-5" /> Change Photo
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Click to upload</h3>
                <p className="text-sm text-foreground/60">JPG, PNG or WEBP (max. 5MB)</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !selectedFile}
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" />
                Upload & Finish
              </>
            )}
          </motion.button>
          
          <div className="text-center">
             <button
              type="button"
              onClick={() => router.push('/discover')}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
             >
               Skip for now
             </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
