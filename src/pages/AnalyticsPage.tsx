import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Flame, 
  Target, 
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Layout from "@/components/layout/Layout";
import { userStats } from "@/data/cp31Data";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Analytics Dashboard Page
 * Displays user progress with beautiful charts
 */
const AnalyticsPage = () => {
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
              Your <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-muted-foreground">
              Track your progress and identify areas for improvement
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              icon={Target}
              label="Total Solved"
              value={userStats.totalSolved}
              color="primary"
            />
            <StatCard
              icon={Flame}
              label="Current Streak"
              value={userStats.currentStreak}
              suffix=" days"
              color="destructive"
            />
            <StatCard
              icon={Award}
              label="Rating"
              value={userStats.rating}
              color="warning"
            />
            <StatCard
              icon={TrendingUp}
              label="Best Streak"
              value={userStats.longestStreak}
              suffix=" days"
              color="success"
            />
          </motion.div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Problems Solved This Week</h3>
              </div>
              <div className="h-64">
                <DailyProgressChart data={userStats.dailySolves} />
              </div>
            </motion.div>

            {/* Difficulty Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Difficulty Breakdown</h3>
              </div>
              <div className="h-64">
                <DifficultyChart data={userStats.problemsByDifficulty} />
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Topic Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-6">
                <PieChartIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Topic-wise Distribution</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="h-64">
                  <TopicChart data={userStats.problemsByTopic} />
                </div>
                <div className="space-y-3">
                  {userStats.problemsByTopic.map((topic, index) => (
                    <TopicBar
                      key={topic.topic}
                      topic={topic.topic}
                      count={topic.count}
                      total={userStats.totalSolved}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Completion Ring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-6 text-center">CP-31 Progress</h3>
              <CompletionRing percentage={68} />
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xl font-bold text-primary">21</div>
                  <div className="text-xs text-muted-foreground">Days Complete</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xl font-bold">10</div>
                  <div className="text-xs text-muted-foreground">Days Left</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * Stat Card Component with animated counter
 */
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color: 'primary' | 'destructive' | 'warning' | 'success';
}

const StatCard = ({ icon: Icon, label, value, suffix = "", color }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    destructive: 'text-destructive bg-destructive/10',
    warning: 'text-warning bg-warning/10',
    success: 'text-success bg-success/10',
  };

  return (
    <div className="glass-card p-4 md:p-6 group hover:border-primary/50 transition-colors">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl md:text-3xl font-bold count-up">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

/**
 * Daily Progress Line Chart
 */
const DailyProgressChart = ({ data }: { data: { date: string; count: number }[] }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Problems Solved',
        data: data.map(d => d.count),
        borderColor: 'hsl(173, 80%, 50%)',
        backgroundColor: 'hsla(173, 80%, 50%, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(173, 80%, 50%)',
        pointBorderColor: 'hsl(173, 80%, 50%)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 12%)',
        borderColor: 'hsl(222, 30%, 25%)',
        borderWidth: 1,
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(215, 20%, 65%)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { color: 'hsla(222, 30%, 25%, 0.3)' },
        ticks: { color: 'hsl(215, 20%, 55%)' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'hsla(222, 30%, 25%, 0.3)' },
        ticks: { color: 'hsl(215, 20%, 55%)' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

/**
 * Difficulty Bar Chart
 */
const DifficultyChart = ({ data }: { data: { easy: number; medium: number; hard: number } }) => {
  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [data.easy, data.medium, data.hard],
        backgroundColor: [
          'hsla(142, 76%, 45%, 0.8)',
          'hsla(45, 93%, 55%, 0.8)',
          'hsla(0, 84%, 60%, 0.8)',
        ],
        borderColor: [
          'hsl(142, 76%, 45%)',
          'hsl(45, 93%, 55%)',
          'hsl(0, 84%, 60%)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 12%)',
        borderColor: 'hsl(222, 30%, 25%)',
        borderWidth: 1,
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(215, 20%, 65%)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'hsl(215, 20%, 55%)' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'hsla(222, 30%, 25%, 0.3)' },
        ticks: { color: 'hsl(215, 20%, 55%)' },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

/**
 * Topic Doughnut Chart
 */
const TopicChart = ({ data }: { data: { topic: string; count: number }[] }) => {
  const colors = [
    'hsl(173, 80%, 50%)',
    'hsl(280, 85%, 65%)',
    'hsl(200, 85%, 55%)',
    'hsl(142, 76%, 45%)',
    'hsl(45, 93%, 55%)',
    'hsl(0, 84%, 60%)',
    'hsl(320, 85%, 60%)',
  ];

  const chartData = {
    labels: data.map(d => d.topic),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: colors.map(c => c.replace(')', ', 0.8)')),
        borderColor: colors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 12%)',
        borderColor: 'hsl(222, 30%, 25%)',
        borderWidth: 1,
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(215, 20%, 65%)',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

/**
 * Topic Progress Bar
 */
const TopicBar = ({ topic, count, total, index }: { topic: string; count: number; total: number; index: number }) => {
  const percentage = Math.round((count / total) * 100);
  const colors = [
    'bg-primary',
    'bg-accent',
    'bg-blue-400',
    'bg-success',
    'bg-warning',
    'bg-destructive',
    'bg-pink-400',
  ];

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{topic}</span>
        <span className="text-muted-foreground">{count} solved</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`h-full rounded-full ${colors[index % colors.length]}`}
        />
      </div>
    </div>
  );
};

/**
 * Animated Completion Ring
 */
const CompletionRing = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0 264" }}
          animate={{ strokeDasharray: `${percentage * 2.64} 264` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold gradient-text">{percentage}%</span>
        <span className="text-sm text-muted-foreground">Complete</span>
      </div>
    </div>
  );
};

export default AnalyticsPage;
