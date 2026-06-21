"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageSquare, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { matchAPI } from "@/lib/api";
import { MatchProfile } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MatchesPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMyMatches() {
      const userId = Number(localStorage.getItem("user_id"));
      if (!userId) {
        window.location.href = '/register';
        return;
      }
      try {
        setLoading(true);
        const data = await matchAPI.getMyMatches(userId);
        console.log("MY MATCHES RESPONSE:", data);
        setMatches(data || []);
      } catch (err) {
        setError("Failed to load your matches.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyMatches();
  }, [user]);

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



  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Mutual Matches</h1>
        <p className="text-muted-foreground mt-1">You both liked each other! Start a conversation.</p>
      </div>

      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-xl font-semibold">No matches yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Keep discovering profiles. When someone you like likes you back, they will appear here.
          </p>
          <Button className="mt-6" onClick={() => window.location.href = '/discover'}>
            Go Discover
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.map((match) => (
            <Card key={match.user_id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-[340px] relative border-border/60 rounded-2xl">
              <div className="absolute inset-0 bg-muted">
                {match.photo_url ? (
                  <img 
                    src={match.photo_url} 
                    alt={match.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                    <span className="text-4xl text-secondary-foreground opacity-50 font-bold">{match.name ? match.name.charAt(0).toUpperCase() : "?"}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full pointer-events-none">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-heading font-bold text-2xl drop-shadow-md mb-1">
                    {match.name}
                  </h3>
                  <div className="flex items-center text-sm font-medium text-white/90 mb-4 drop-shadow-md bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 w-fit border border-white/10">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    <span>Matched {match.matched_at ? new Date(match.matched_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}</span>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <Button className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm border border-primary/20 shadow-xl" variant="default">
                      <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
