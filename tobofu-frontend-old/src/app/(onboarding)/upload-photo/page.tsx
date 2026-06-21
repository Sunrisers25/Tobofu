"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { onboardingAPI } from "@/lib/api";

export default function UploadPhotoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith("image/")) {
        setError("Please drop an image file");
        return;
      }
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setError(null);
    }
  };

  const handleUpload = async () => {
    const userId = Number(localStorage.getItem("user_id"));
    if (!userId) {
      console.log("Please register again");
      router.push("/register");
      return;
    }

    if (!file) {
      setError("Please select a photo to upload");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      await onboardingAPI.uploadPhoto(userId, file);
      // Move to dashboard after completing onboarding
      router.push("/discover");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to upload photo. Please try again.");
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">✓</div>
          <div className="h-1 w-12 bg-primary rounded"></div>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">✓</div>
          <div className="h-1 w-12 bg-primary rounded"></div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">3</div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Upload Photo</span>
      </div>

      <Card className="w-full max-w-xl border-border/60 bg-card/50 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-heading text-2xl font-bold">Add your best photo</CardTitle>
          <CardDescription>
            Profiles with photos get 9x more matches. Choose a photo that shows your face clearly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {!preview ? (
            <div
              className="mt-4 flex w-full max-w-sm flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium">Click or drag photo here</h3>
              <p className="mt-1 text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          ) : (
            <div className="relative mt-4 h-64 w-64 overflow-hidden rounded-2xl border-4 border-card shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Profile Preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {error && (
            <div className="mt-6 w-full max-w-sm rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}

          <div className="mt-8 flex w-full max-w-sm justify-between">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              type="button"
              className="rounded-full px-8"
              disabled={!file || isUploading}
              onClick={handleUpload}
            >
              {isUploading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
