import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Bell,
  Timer,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { upcomingContests, Contest } from "@/data/cp31Data";

/**
 * Contest Tracker Page
 * Displays upcoming programming contests with countdown timers
 */
const ContestsPage = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Contest <span className="gradient-text">Tracker</span>
            </h1>
            <p className="text-muted-foreground">
              Never miss a contest. Stay updated with upcoming competitions from all major platforms.
            </p>
          </motion.div>

          {/* Featured Contest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <FeaturedContest contest={upcomingContests[0]} />
          </motion.div>

          {/* Upcoming Contests Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Contests
              </h2>
              <Button variant="outline" size="sm" className="border-border">
                <Bell className="h-4 w-4 mr-2" />
                Set Reminders
              </Button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-4 font-medium text-muted-foreground">Platform</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Contest Name</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Start Time</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Countdown</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingContests.map((contest, index) => (
                    <ContestRow key={contest.id} contest={contest} index={index} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {upcomingContests.map((contest, index) => (
                <ContestCard key={contest.id} contest={contest} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Platform Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass-card p-6"
          >
            <h3 className="font-semibold mb-4">Supported Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Codeforces", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { name: "LeetCode", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
                { name: "CodeChef", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                { name: "AtCoder", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className={`px-4 py-3 rounded-lg border text-center text-sm font-medium ${platform.color}`}
                >
                  {platform.name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * Featured Contest Card with large countdown
 */
const FeaturedContest = ({ contest }: { contest: Contest }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(contest.startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [contest.startTime]);

  const getPlatformClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'codeforces': return 'badge-codeforces';
      case 'codechef': return 'badge-codechef';
      case 'leetcode': return 'badge-leetcode';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-sm text-primary font-medium">Next Contest</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className={`inline-block text-xs px-2 py-1 rounded-full border mb-2 ${getPlatformClass(contest.platform)}`}>
              {contest.platform}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{contest.name}</h2>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {contest.startTime.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {contest.duration}
              </span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex gap-3">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="glass-card w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-1">
                  <span className="text-2xl md:text-3xl font-bold gradient-text">{value}</span>
                </div>
                <span className="text-xs text-muted-foreground uppercase">{unit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Register Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-border">
            <Bell className="mr-2 h-4 w-4" />
            Remind Me
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Contest Table Row Component
 */
const ContestRow = ({ contest, index }: { contest: Contest; index: number }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(contest.startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [contest.startTime]);

  const getPlatformClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'codeforces': return 'badge-codeforces';
      case 'codechef': return 'badge-codechef';
      case 'leetcode': return 'badge-leetcode';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <td className="p-4">
        <span className={`text-xs px-2 py-1 rounded-full border ${getPlatformClass(contest.platform)}`}>
          {contest.platform}
        </span>
      </td>
      <td className="p-4 font-medium">{contest.name}</td>
      <td className="p-4 text-muted-foreground">
        <div>{contest.startTime.toLocaleDateString()}</div>
        <div className="text-sm">{contest.startTime.toLocaleTimeString()}</div>
      </td>
      <td className="p-4 text-muted-foreground">{contest.duration}</td>
      <td className="p-4">
        <div className="flex items-center gap-1 text-primary">
          <Timer className="h-4 w-4" />
          <span className="font-mono text-sm">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m
          </span>
        </div>
      </td>
      <td className="p-4 text-right">
        <Button size="sm" variant="outline" className="border-border hover:border-primary/50">
          Register
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </td>
    </motion.tr>
  );
};

/**
 * Contest Card for Mobile
 */
const ContestCard = ({ contest, index }: { contest: Contest; index: number }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(contest.startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [contest.startTime]);

  const getPlatformClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'codeforces': return 'badge-codeforces';
      case 'codechef': return 'badge-codechef';
      case 'leetcode': return 'badge-leetcode';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-lg bg-muted/30 border border-border"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full border ${getPlatformClass(contest.platform)}`}>
          {contest.platform}
        </span>
        <div className="flex items-center gap-1 text-primary text-sm">
          <Timer className="h-4 w-4" />
          <span className="font-mono">{timeLeft.days}d {timeLeft.hours}h</span>
        </div>
      </div>
      <h3 className="font-medium mb-2">{contest.name}</h3>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {contest.startTime.toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {contest.duration}
        </span>
      </div>
      <Button size="sm" className="w-full bg-primary text-primary-foreground">
        Register
        <ExternalLink className="ml-2 h-3 w-3" />
      </Button>
    </motion.div>
  );
};

/**
 * Calculate time left until a given date
 */
function getTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default ContestsPage;
