"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Heart, X, GraduationCap, Briefcase, MapPin, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { matchAPI } from "@/lib/api";
import { MatchProfile } from "@/types/api";
import { Button } from "@/components/ui/button";

export default function DiscoverPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [totalMatches, setTotalMatches] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [0, -100], [0, 1]);

  useEffect(() => {
    async function fetchMatches() {
      const userId = Number(localStorage.getItem("user_id"));
      console.log("DISCOVER USER ID:", userId);
      
      if (!userId) {
        window.location.href = '/register';
        return;
      }
      
      try {
        setLoading(true);
        const data = await matchAPI.getMatches(userId);
        console.log("MATCHES RESPONSE:", data);
        
        if (data && data.matches) {
          setMatches(data.matches);
          setTotalMatches(data.total_matches);
        } else {
          // fallback if backend returned array directly
          setMatches(Array.isArray(data) ? data : []);
          setTotalMatches(Array.isArray(data) ? data.length : 0);
        }
      } catch (err) {
        setError("Failed to load potential matches.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  const handleSwipe = async (direction: "like" | "pass", profileId: number) => {
    const userId = Number(localStorage.getItem("user_id"));
    if (!userId) return;
    try {
      await matchAPI.swipe({
        from_user_id: userId,
        to_user_id: profileId,
        action: direction,
      });
      // Remove the top profile
      setMatches((prev) => prev.slice(1));
      x.set(0);
    } catch (err) {
      console.error("Failed to register swipe", err);
    }
  };

  const handleDragEnd = async (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      await controls.start({ x: 500, transition: { duration: 0.2 } });
      if (matches.length > 0) handleSwipe("like", matches[0].user_id);
    } else if (offset < -100 || velocity < -500) {
      await controls.start({ x: -500, transition: { duration: 0.2 } });
      if (matches.length > 0) handleSwipe("pass", matches[0].user_id);
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const handleButtonClick = async (direction: "like" | "pass") => {
    if (matches.length === 0) return;
    const targetX = direction === "like" ? 500 : -500;
    await controls.start({ x: targetX, transition: { duration: 0.3 } });
    handleSwipe(direction, matches[0].user_id);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Helper to calculate age from DOB
  const getAge = (dobString: string) => {
    if (!dobString) return "";
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="relative h-[600px] w-full max-w-sm">
        <AnimatePresence>
          {matches.length > 0 ? (
            matches.map((match, index) => {
              // Only render the top 2 cards for performance
              if (index > 1) return null;
              
              const isTop = index === 0;
              return (
                <motion.div
                  key={match.user_id}
                  className="absolute inset-0 rounded-3xl bg-card shadow-xl border border-border/60 overflow-hidden touch-none"
                  style={{
                    x: isTop ? x : 0,
                    rotate: isTop ? rotate : 0,
                    opacity: isTop ? opacity : 1,
                    scale: isTop ? 1 : 0.95,
                    zIndex: matches.length - index,
                  }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                  animate={controls}
                >
                  <div className="relative h-full w-full bg-muted">
                    {match?.photo_url ? (
                      <img 
                        src={match.photo_url} 
                        alt={match.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                        <span className="text-muted-foreground text-sm">No Photo Available</span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    {/* Like/Pass Overlays */}
                    {isTop && (
                      <>
                        <motion.div 
                          style={{ opacity: likeOpacity }}
                          className="absolute top-10 left-8 border-[4px] border-green-500 rounded-xl px-6 py-2 text-green-500 text-4xl font-extrabold rotate-[-15deg] shadow-2xl tracking-wider backdrop-blur-sm bg-black/10 z-50"
                        >
                          LIKE
                        </motion.div>
                        <motion.div 
                          style={{ opacity: passOpacity }}
                          className="absolute top-10 right-8 border-[4px] border-destructive rounded-xl px-6 py-2 text-destructive text-4xl font-extrabold rotate-[15deg] shadow-2xl tracking-wider backdrop-blur-sm bg-black/10 z-50"
                        >
                          PASS
                        </motion.div>
                      </>
                    )}

                    {/* Profile Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                      <div className="flex items-end justify-between mb-2">
                        <h2 className="font-heading text-3xl font-bold text-white drop-shadow-md">
                          {match.name}, <span className="text-2xl font-normal text-white/80">{match.age}</span>
                        </h2>
                        <span className="flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xl border border-primary/20">
                          <Sparkles className="h-3.5 w-3.5" /> 95% Match
                        </span>
                      </div>
                      
                      <p className="text-base text-white/90 font-medium mb-4 flex items-center gap-2 drop-shadow-md">
                        <Briefcase className="h-4 w-4 opacity-80" /> {match.profession}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white/90 border border-white/10">
                          <GraduationCap className="h-3.5 w-3.5" />
                          <span>{match.education}</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white/90 border border-white/10">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{match.location}</span>
                        </div>
                        {(match.religion || match.community) && (
                          <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white/90 border border-white/10">
                            <span>{match.religion}{match.community ? `, ${match.community}` : ''}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-white/80 line-clamp-3 leading-relaxed drop-shadow-sm font-medium">
                        "{match.bio}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : totalMatches === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-semibold">You're all caught up!</h3>
              <p className="mt-2 text-sm text-muted-foreground">We're searching for more potential matches for you. Check back later.</p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </AnimatePresence>

        {matches.length > 0 && (
          <div className="absolute -bottom-24 left-0 right-0 flex items-center justify-center gap-6">
            <button
              onClick={() => handleButtonClick("pass")}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-all hover:scale-110 hover:border-destructive hover:text-destructive"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={() => handleButtonClick("like")}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-110 hover:bg-primary/90"
            >
              <Heart className="h-7 w-7 fill-current" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
