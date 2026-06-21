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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { onboardingAPI } from "@/lib/api";

const preferenceSchema = z.object({
  min_age: z.number().min(18, "Minimum age must be 18").max(100),
  max_age: z.number().min(18).max(100),
  preferred_location: z.string().min(2, "Location is required"),
  preferred_education: z.string().min(2, "Education is required"),
  preferred_profession: z.string().min(2, "Profession is required"),
  preferred_religion: z.string().min(2, "Religion is required"),
}).refine((data) => data.max_age >= data.min_age, {
  message: "Maximum age must be greater than or equal to minimum age",
  path: ["max_age"],
});

type PreferenceFormValues = z.infer<typeof preferenceSchema>;

export default function SetupPreferencesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreferenceFormValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      min_age: 21,
      max_age: 28,
    }
  });

  const onSubmit = async (data: PreferenceFormValues) => {
    const userId = Number(localStorage.getItem("user_id"));
    if (!userId) {
      console.log("Please register again");
      router.push("/register");
      return;
    }
    
    try {
      setError(null);
      await onboardingAPI.createPreference({
        user_id: userId,
        ...data,
      });
      router.push("/upload-photo");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to save preferences. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">✓</div>
          <div className="h-1 w-12 bg-primary rounded"></div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">2</div>
          <div className="h-1 w-12 bg-muted rounded"></div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">3</div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">Partner Preferences</span>
      </div>

      <Card className="w-full max-w-2xl border-border/60 bg-card/50 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="font-heading text-2xl font-bold">What are you looking for?</CardTitle>
          <CardDescription>
            Help our AI engine find the perfect matches by setting your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_age">Minimum Age</Label>
                <Input
                  id="min_age"
                  type="number"
                  {...register("min_age", { valueAsNumber: true })}
                />
                {errors.min_age && <p className="text-[13px] text-destructive">{errors.min_age.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_age">Maximum Age</Label>
                <Input
                  id="max_age"
                  type="number"
                  {...register("max_age", { valueAsNumber: true })}
                />
                {errors.max_age && <p className="text-[13px] text-destructive">{errors.max_age.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred_location">Preferred Location</Label>
                <Input
                  id="preferred_location"
                  placeholder="e.g. Hyderabad"
                  {...register("preferred_location")}
                />
                {errors.preferred_location && <p className="text-[13px] text-destructive">{errors.preferred_location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_education">Preferred Education</Label>
                <Input
                  id="preferred_education"
                  placeholder="e.g. B.Tech"
                  {...register("preferred_education")}
                />
                {errors.preferred_education && <p className="text-[13px] text-destructive">{errors.preferred_education.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_profession">Preferred Profession</Label>
                <Input
                  id="preferred_profession"
                  placeholder="e.g. Software Engineer"
                  {...register("preferred_profession")}
                />
                {errors.preferred_profession && <p className="text-[13px] text-destructive">{errors.preferred_profession.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_religion">Preferred Religion</Label>
                <Input
                  id="preferred_religion"
                  placeholder="e.g. Hindu"
                  {...register("preferred_religion")}
                />
                {errors.preferred_religion && <p className="text-[13px] text-destructive">{errors.preferred_religion.message}</p>}
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  "Continue to Photos"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
