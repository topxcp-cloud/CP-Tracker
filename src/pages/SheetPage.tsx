import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Search,
  ExternalLink,
  RefreshCw,
  Edit2,
  Check,
  X,
  Bookmark,
  MessageSquare,
  FileText,
  Lightbulb,
  Calendar,
  Flame,
  Trophy,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import { tleCp31Problems, TLEProblem, availableRatings, getAllProblems } from "@/data/tleCp31Data";
import { useAuth } from "@/hooks/useAuth";
import { useCodeforcesSync } from "@/hooks/useCodeforcesSync";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

/**
 * TLE CP-31 Sheet Page
 * Inspired by tle-eliminators.com/cp-sheet design
 */
const SheetPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { syncFromCodeforces, loading: syncLoading } = useCodeforcesSync();
  
  const [selectedRating, setSelectedRating] = useState<number>(800);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "bookmarked" | "notes">("all");
  const [focusMode, setFocusMode] = useState(false);
  const [cfHandle, setCfHandle] = useState("");
  const [isEditingHandle, setIsEditingHandle] = useState(false);
  const [tempHandle, setTempHandle] = useState("");
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(new Set());
  const [cfSolvedProblems, setCfSolvedProblems] = useState<Set<string>>(new Set());
  const [cfStats, setCfStats] = useState<{ rating: number | null; rank: string | null; totalSolved: number } | null>(null);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    // Load profile with CF handle
    const { data: profile } = await supabase
      .from('profiles')
      .select('codeforces_handle')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profile?.codeforces_handle) {
      setCfHandle(profile.codeforces_handle);
    }

    // Load solved problems
    const { data: progress } = await supabase
      .from('problem_progress')
      .select('problem_id')
      .eq('user_id', user.id)
      .eq('solved', true);

    if (progress) {
      setSolvedProblems(new Set(progress.map(p => p.problem_id)));
    }
  };

  // Get problems for selected rating
  const problems = useMemo(() => {
    const category = tleCp31Problems.find(c => c.rating === selectedRating);
    let filteredProblems = category?.problems || [];

    if (searchTerm) {
      filteredProblems = filteredProblems.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeTab === "bookmarked") {
      filteredProblems = filteredProblems.filter(p => bookmarkedProblems.has(p.id));
    }

    if (focusMode) {
      filteredProblems = filteredProblems.filter(p => !solvedProblems.has(p.id));
    }

    return filteredProblems;
  }, [selectedRating, searchTerm, activeTab, focusMode, bookmarkedProblems, solvedProblems]);

  // Calculate progress stats
  const allProblems = getAllProblems();
  const totalSolved = solvedProblems.size;
  const ratingProblems = tleCp31Problems.find(c => c.rating === selectedRating)?.problems || [];
  const ratingSolved = ratingProblems.filter(p => solvedProblems.has(p.id)).length;

  const handleSaveHandle = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save your Codeforces handle",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ codeforces_handle: tempHandle })
      .eq('user_id', user.id);

    if (!error) {
      setCfHandle(tempHandle);
      setIsEditingHandle(false);
      toast({
        title: "Handle saved!",
        description: "Your Codeforces handle has been updated",
      });
    }
  };

  const handleRefresh = async () => {
    if (!cfHandle) {
      toast({
        title: "No handle",
        description: "Please set your Codeforces handle first",
        variant: "destructive",
      });
      return;
    }

    const result = await syncFromCodeforces(cfHandle);
    if (result) {
      setCfStats({
        rating: result.rating,
        rank: result.rank,
        totalSolved: result.totalSolved,
      });

      // Create a set of solved problem identifiers
      const solved = new Set<string>();
      for (const problem of result.problems) {
        const key = `${problem.contestId}-${problem.index}`;
        solved.add(key);
      }
      setCfSolvedProblems(solved);

      // Update local solved state based on matching problems
      const newSolved = new Set(solvedProblems);
      for (const prob of allProblems) {
        const key = `${prob.contestId}-${prob.index}`;
        if (solved.has(key)) {
          newSolved.add(prob.id);
          // Save to database
          if (user) {
            await supabase.from('problem_progress').upsert({
              user_id: user.id,
              problem_id: prob.id,
              solved: true,
              solved_at: new Date().toISOString(),
              source: 'codeforces',
            }, { onConflict: 'user_id,problem_id' });
          }
        }
      }
      setSolvedProblems(newSolved);
    }
  };

  const toggleProblem = async (problemId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to track your progress",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    const newSolved = new Set(solvedProblems);
    const isSolved = newSolved.has(problemId);

    if (isSolved) {
      newSolved.delete(problemId);
      await supabase.from('problem_progress').delete()
        .eq('user_id', user.id)
        .eq('problem_id', problemId);
    } else {
      newSolved.add(problemId);
      await supabase.from('problem_progress').upsert({
        user_id: user.id,
        problem_id: problemId,
        solved: true,
        solved_at: new Date().toISOString(),
        source: 'manual',
      }, { onConflict: 'user_id,problem_id' });
    }
    setSolvedProblems(newSolved);
  };

  const toggleBookmark = (problemId: string) => {
    const newBookmarks = new Set(bookmarkedProblems);
    if (newBookmarks.has(problemId)) {
      newBookmarks.delete(problemId);
    } else {
      newBookmarks.add(problemId);
    }
    setBookmarkedProblems(newBookmarks);
  };

  // Activity heatmap data (mock for now)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date,
        count: Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0,
      });
    }
    return data;
  };

  const heatmapData = useMemo(generateHeatmapData, []);

  return (
    <Layout>
      <div className="min-h-screen py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Rating Filters */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <span className="text-sm text-muted-foreground self-center mr-2">Rating</span>
            {availableRatings.map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedRating === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted text-muted-foreground'
                }`}
              >
                {rating}
              </button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content */}
            <div className="space-y-4">
              {/* Progress Cards */}
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4"
                >
                  <div className="text-sm text-muted-foreground mb-1">Rating Progress</div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{ratingSolved}/{ratingProblems.length}</span>
                    <ProgressRing 
                      percentage={ratingProblems.length > 0 ? (ratingSolved / ratingProblems.length) * 100 : 0} 
                      size={40}
                    />
                  </div>
                  <div className="text-xs text-primary mt-1">Problems Solved</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-4"
                >
                  <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{totalSolved}/{allProblems.length}</span>
                    <ProgressRing 
                      percentage={allProblems.length > 0 ? (totalSolved / allProblems.length) * 100 : 0} 
                      size={40}
                    />
                  </div>
                  <div className="text-xs text-primary mt-1">Problems Solved</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-4"
                >
                  <div className="text-sm text-muted-foreground mb-1">Leaderboard</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold gradient-text">{cfStats?.rating || '--'}</span>
                    <a href={cfHandle ? `https://codeforces.com/profile/${cfHandle}` : '#'} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </div>
                  <div className="text-xs text-primary mt-1">{cfStats?.rank || 'Rank'}</div>
                </motion.div>
              </div>

              {/* Activity Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{heatmapData.filter(d => d.count > 0).length} Active days</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/50 flex items-center justify-center text-[10px]">i</div>
                      </TooltipTrigger>
                      <TooltipContent>Your activity over the past year</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-warning" />
                      <span>0 Days AC Streak</span>
                    </div>
                    <span className="text-muted-foreground">Longest: 3</span>
                  </div>
                </div>
                
                {/* Heatmap Grid */}
                <div className="overflow-x-auto pb-2">
                  <div className="grid grid-flow-col gap-[2px]" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
                    {heatmapData.map((day, i) => (
                      <Tooltip key={i}>
                        <TooltipTrigger>
                          <div
                            className={`w-3 h-3 rounded-sm ${
                              day.count === 0 ? 'bg-muted/30' :
                              day.count === 1 ? 'bg-success/30' :
                              day.count === 2 ? 'bg-success/50' :
                              day.count === 3 ? 'bg-success/70' :
                              'bg-success'
                            }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {day.count} problems on {day.date.toLocaleDateString()}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{totalSolved} problems solved this year</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(level => (
                      <div key={level} className={`w-3 h-3 rounded-sm ${
                        level === 0 ? 'bg-muted/30' :
                        level === 1 ? 'bg-success/30' :
                        level === 2 ? 'bg-success/50' :
                        level === 3 ? 'bg-success/70' :
                        'bg-success'
                      }`} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </motion.div>

              {/* Filters and Handle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex-shrink-0">
                    <TabsList className="bg-muted/50">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Focus Mode</span>
                    <Switch checked={focusMode} onCheckedChange={setFocusMode} />
                  </div>

                  <div className="flex-1" />

                  {/* Codeforces Handle */}
                  <div className="flex items-center gap-2">
                    <img src="https://codeforces.org/s/0/favicon-32x32.png" alt="CF" className="h-5 w-5" />
                    {isEditingHandle ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={tempHandle}
                          onChange={(e) => setTempHandle(e.target.value)}
                          placeholder="CF handle"
                          className="h-8 w-32 text-sm"
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSaveHandle}>
                          <Check className="h-4 w-4 text-success" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditingHandle(false)}>
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm">{cfHandle || 'Not set'}</span>
                        {cfHandle && <Check className="h-4 w-4 text-success" />}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => { setTempHandle(cfHandle); setIsEditingHandle(true); }}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      className="h-8 bg-destructive hover:bg-destructive/90"
                      onClick={handleRefresh}
                      disabled={syncLoading || !cfHandle}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${syncLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Problems Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card overflow-hidden"
              >
                {/* Table Header */}
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="w-8">Problem</div>
                  <div className="flex items-center gap-1">
                    <a href="#" className="hover:text-primary">Problem ↗</a>
                  </div>
                  <div>Solution</div>
                  <div>Notes</div>
                  <div>Status</div>
                  <div>Bookmark</div>
                  <div>Concept</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-border">
                  {problems.map((problem, index) => (
                    <ProblemRow
                      key={problem.id}
                      problem={problem}
                      index={index + 1}
                      isSolved={solvedProblems.has(problem.id)}
                      isBookmarked={bookmarkedProblems.has(problem.id)}
                      onToggleSolved={() => toggleProblem(problem.id)}
                      onToggleBookmark={() => toggleBookmark(problem.id)}
                    />
                  ))}
                </div>

                {problems.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No problems found matching your criteria
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Streak Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-4"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Current Visit Streak</div>
                      <div className="font-bold">5 days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <Flame className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Longest Visit Streak</div>
                      <div className="font-bold">5 days</div>
                    </div>
                  </div>
                </div>

                <VisitCalendar />
              </motion.div>

              {/* Leaderboard Teaser */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Leaderboard</h3>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/50 flex items-center justify-center text-[10px]">i</div>
                      </TooltipTrigger>
                      <TooltipContent>Top performers this week</TooltipContent>
                    </Tooltip>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="text-center py-4 text-muted-foreground">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <p className="text-sm">Login to see the leaderboard</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Progress Ring Component
const ProgressRing = ({ percentage, size }: { percentage: number; size: number }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current text-[8px] font-bold"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

// Problem Row Component
const ProblemRow = ({ 
  problem, 
  index, 
  isSolved, 
  isBookmarked,
  onToggleSolved,
  onToggleBookmark
}: { 
  problem: TLEProblem; 
  index: number; 
  isSolved: boolean;
  isBookmarked: boolean;
  onToggleSolved: () => void;
  onToggleBookmark: () => void;
}) => (
  <div className={`grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 items-center text-sm hover:bg-muted/30 transition-colors ${
    isSolved ? 'bg-success/5' : ''
  }`}>
    <div className="w-8 text-muted-foreground">{index}.</div>
    <a 
      href={problem.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`hover:text-primary flex items-center gap-2 ${isSolved ? 'text-muted-foreground line-through' : ''}`}
    >
      {problem.name}
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>
    <Tooltip>
      <TooltipTrigger>
        <button className="p-2 rounded hover:bg-muted transition-colors">
          <FileText className="h-4 w-4 text-muted-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent>View solution</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        <button className="p-2 rounded hover:bg-muted transition-colors">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent>Add notes</TooltipContent>
    </Tooltip>
    <button 
      onClick={onToggleSolved}
      className="p-2 rounded hover:bg-muted transition-colors"
    >
      {isSolved ? (
        <CheckCircle2 className="h-5 w-5 text-success" />
      ) : (
        <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
      )}
    </button>
    <button 
      onClick={onToggleBookmark}
      className="p-2 rounded hover:bg-muted transition-colors"
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-warning text-warning' : 'text-muted-foreground'}`} />
    </button>
    <div className="flex flex-wrap gap-1">
      {problem.tags.slice(0, 2).map(tag => (
        <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded bg-muted text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// Visit Calendar Component
const VisitCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  // Mock visited days
  const visitedDays = new Set([1, 2, 3, 4, 5]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Visit Streak Calendar
        </h4>
        <Tooltip>
          <TooltipTrigger>
            <div className="h-4 w-4 rounded-full border border-muted-foreground/50 flex items-center justify-center text-[10px]">i</div>
          </TooltipTrigger>
          <TooltipContent>Days you visited the platform</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-1 rounded hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-1 rounded hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {dayNames.map(day => (
          <div key={day} className="text-muted-foreground py-1">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isVisited = visitedDays.has(day);
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-full text-xs ${
                isVisited 
                  ? 'bg-success text-success-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SheetPage;
