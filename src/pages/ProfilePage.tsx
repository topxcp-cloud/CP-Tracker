import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Flame,
  Target,
  Award,
  Calendar,
  Settings,
  LogOut,
  Edit3,
  Camera,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useCodeforcesSync } from "@/hooks/useCodeforcesSync";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Profile Page
 * User profile with stats and Codeforces integration
 */
const ProfilePage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <ProfileView user={user} onLogout={signOut} />
        </div>
      </div>
    </Layout>
  );
};

/**
 * Profile View when logged in
 */
const ProfileView = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
  const { toast } = useToast();
  const { syncFromCodeforces, loading: syncLoading, data: cfData } = useCodeforcesSync();
  const [profile, setProfile] = useState<{
    username: string | null;
    codeforces_handle: string | null;
  } | null>(null);
  const [isEditingHandle, setIsEditingHandle] = useState(false);
  const [tempHandle, setTempHandle] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    loadProfile();
    loadSolvedCount();
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('username, codeforces_handle')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
      setTempHandle(data.codeforces_handle || "");
    }
  };

  const loadSolvedCount = async () => {
    const { count } = await supabase
      .from('problem_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('solved', true);
    
    setSolvedCount(count || 0);
  };

  const handleSaveHandle = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ codeforces_handle: tempHandle })
      .eq('user_id', user.id);

    if (!error) {
      setProfile(prev => prev ? { ...prev, codeforces_handle: tempHandle } : null);
      setIsEditingHandle(false);
      toast({
        title: "Handle saved!",
        description: "Your Codeforces handle has been updated",
      });
    }
  };

  const handleRefresh = async () => {
    if (!profile?.codeforces_handle) {
      toast({
        title: "No handle",
        description: "Please set your Codeforces handle first",
        variant: "destructive",
      });
      return;
    }
    await syncFromCodeforces(profile.codeforces_handle);
    loadSolvedCount();
  };

  const username = profile?.username || user.email?.split('@')[0] || 'User';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Your <span className="gradient-text">Profile</span>
        </h1>
        <p className="text-muted-foreground">
          Manage your account and sync your Codeforces progress
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          {/* Avatar */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
              {username.substring(0, 2).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
              <Camera className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <h2 className="text-xl font-bold mb-1">{username}</h2>
          <p className="text-muted-foreground text-sm mb-4">{user.email}</p>

          {/* Rank Badge */}
          {cfData?.rank && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 text-warning border border-warning/30 mb-6">
              <Award className="h-4 w-4" />
              <span className="font-medium capitalize">{cfData.rank}</span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-border"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Codeforces Handle Card */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <img src="https://codeforces.org/s/0/favicon-32x32.png" alt="CF" className="h-5 w-5" />
              Codeforces Integration
            </h3>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                {isEditingHandle ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={tempHandle}
                      onChange={(e) => setTempHandle(e.target.value)}
                      placeholder="Enter your Codeforces handle"
                      className="max-w-xs"
                    />
                    <Button size="sm" onClick={handleSaveHandle}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditingHandle(false)}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">
                      {profile?.codeforces_handle || 'No handle set'}
                    </span>
                    {profile?.codeforces_handle && (
                      <a 
                        href={`https://codeforces.com/profile/${profile.codeforces_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View Profile <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setTempHandle(profile?.codeforces_handle || ""); setIsEditingHandle(true); }}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleRefresh}
                disabled={syncLoading || !profile?.codeforces_handle}
                className="bg-destructive hover:bg-destructive/90"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncLoading ? 'animate-spin' : ''}`} />
                Sync from Codeforces
              </Button>
            </div>

            {cfData && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{cfData.totalSolved}</div>
                    <div className="text-xs text-muted-foreground">Problems on CF</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{cfData.rating || '--'}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold capitalize">{cfData.rank || '--'}</div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{solvedCount}</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{cfData?.rating || '--'}</div>
                  <div className="text-sm text-muted-foreground">CF Rating</div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {solvedCount > 0 ? (
                <p className="text-muted-foreground text-sm">
                  You've solved {solvedCount} problems. Keep going! 💪
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Start solving problems to see your activity here.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
