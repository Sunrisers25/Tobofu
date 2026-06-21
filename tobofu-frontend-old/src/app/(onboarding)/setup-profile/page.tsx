"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { onboardingAPI } from "@/lib/api";

const profileSchema = z.object({
  gender: z.string().min(1, "Please select a gender"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date of birth (YYYY-MM-DD)"),
  location: z.string().min(2, "Location is required"),
  education: z.string().min(2, "Education is required"),
  profession: z.string().min(2, "Profession is required"),
  religion: z.string().min(2, "Religion is required"),
  community: z.string().min(2, "Community is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function SetupProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const userId = Number(localStorage.getItem("user_id"));
    
    if (!userId) {
      console.log("Please register again");
      router.push("/register");
      return;
    }
    
    const payload = {
      user_id: userId,
      gender: data.gender,
      dob: data.dob,
      location: data.location,
      education: data.education,
      profession: data.profession,
      religion: data.religion,
      community: data.community,
      bio: data.bio,
    };
    
    console.log("USER ID", userId);
    console.log("PROFILE PAYLOAD", payload);
    
    try {
      setError(null);
      setSuccess(null);
      const response = await onboardingAPI.createProfile(payload);
      console.log("Profile response:", response);
      setSuccess("Profile created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/setup-preferences");
      }, 1500);
    } catch (err: any) {
      console.log("FULL ERROR", err);
      console.log("RESPONSE", err.response);
      console.log("DATA", err.response?.data);
      console.log(
        "DATA STRING",
        JSON.stringify(err.response?.data, null, 2)
      );
      
      const detail = err.response?.data?.detail;
      let errorMessage = "Something went wrong";
      
      if (Array.isArray(detail)) {
        errorMessage = detail[0]?.msg || "Validation error";
      } else if (typeof detail === "string") {
        errorMessage = detail;
      }
      
      setError(errorMessage);
    }
  };

  if (!user) return null; // Or a loading spinner if checking auth

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">1</div>
          <div className="h-1 w-12 bg-muted rounded"></div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">2</div>
          <div className="h-1 w-12 bg-muted rounded"></div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">3</div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Profile Setup</span>
      </div>

      <Card className="w-full max-w-2xl border-border/60 bg-card/50 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="font-heading text-2xl font-bold">Tell us about yourself</CardTitle>
          <CardDescription>
            This information will be shown on your profile to potential matches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  {...register("gender")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-[13px] text-destructive">{errors.gender.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  {...register("dob")}
                  className={errors.dob ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.dob && <p className="text-[13px] text-destructive">{errors.dob.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (City)</Label>
                <Input
                  id="location"
                  placeholder="e.g. Hyderabad"
                  {...register("location")}
                />
                {errors.location && <p className="text-[13px] text-destructive">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  placeholder="e.g. B.Tech"
                  {...register("education")}
                />
                {errors.education && <p className="text-[13px] text-destructive">{errors.education.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  placeholder="e.g. Software Engineer"
                  {...register("profession")}
                />
                {errors.profession && <p className="text-[13px] text-destructive">{errors.profession.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  placeholder="e.g. Hindu"
                  {...register("religion")}
                />
                {errors.religion && <p className="text-[13px] text-destructive">{errors.religion.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="community">Community / Caste</Label>
                <Input
                  id="community"
                  placeholder="e.g. Reddy"
                  {...register("community")}
                />
                {errors.community && <p className="text-[13px] text-destructive">{errors.community.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Me (Bio)</Label>
              <Textarea
                id="bio"
                placeholder="Write a little bit about yourself, your hobbies, and what you're looking for..."
                {...register("bio")}
                className="h-24"
              />
              {errors.bio && <p className="text-[13px] text-destructive">{errors.bio.message}</p>}
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-600 dark:text-green-400">
                {success}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  "Continue to Preferences"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
