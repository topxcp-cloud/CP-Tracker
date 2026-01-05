/**
 * CP-31 Sheet Data
 * Contains all 31 days of structured competitive programming topics
 */

export interface Problem {
  id: string;
  name: string;
  platform: 'Codeforces' | 'LeetCode' | 'CodeChef' | 'AtCoder';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link: string;
  completed: boolean;
}

export interface DayData {
  day: number;
  topic: string;
  description: string;
  icon: string;
  problems: Problem[];
  completed: boolean;
}

export const cp31Data: DayData[] = [
  {
    day: 1,
    topic: "Arrays Fundamentals",
    description: "Master array manipulation, traversal, and basic operations",
    icon: "📊",
    completed: false,
    problems: [
      { id: "1-1", name: "Two Sum", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "1-2", name: "Maximum Subarray", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "1-3", name: "Product of Array Except Self", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 2,
    topic: "Strings & Hashing",
    description: "String manipulation, pattern matching, and hash-based solutions",
    icon: "🔤",
    completed: false,
    problems: [
      { id: "2-1", name: "Valid Anagram", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "2-2", name: "Longest Substring Without Repeating", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "2-3", name: "Group Anagrams", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 3,
    topic: "Two Pointers",
    description: "Efficient algorithms using the two-pointer technique",
    icon: "👆",
    completed: false,
    problems: [
      { id: "3-1", name: "Container With Most Water", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "3-2", name: "3Sum", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "3-3", name: "Trapping Rain Water", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 4,
    topic: "Sliding Window",
    description: "Optimize subarray/substring problems with sliding window",
    icon: "🪟",
    completed: false,
    problems: [
      { id: "4-1", name: "Minimum Window Substring", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "4-2", name: "Longest Repeating Character Replacement", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "4-3", name: "Permutation in String", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 5,
    topic: "Binary Search",
    description: "Master logarithmic search and its variations",
    icon: "🔍",
    completed: false,
    problems: [
      { id: "5-1", name: "Binary Search", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "5-2", name: "Search in Rotated Sorted Array", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "5-3", name: "Median of Two Sorted Arrays", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 6,
    topic: "Stacks",
    description: "LIFO data structure and monotonic stack patterns",
    icon: "📚",
    completed: false,
    problems: [
      { id: "6-1", name: "Valid Parentheses", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "6-2", name: "Daily Temperatures", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "6-3", name: "Largest Rectangle in Histogram", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 7,
    topic: "Queues & Deques",
    description: "FIFO structures and double-ended queue problems",
    icon: "🚶",
    completed: false,
    problems: [
      { id: "7-1", name: "Implement Queue using Stacks", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "7-2", name: "Sliding Window Maximum", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "7-3", name: "Design Circular Queue", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 8,
    topic: "Linked Lists",
    description: "Pointer manipulation and linked list techniques",
    icon: "🔗",
    completed: false,
    problems: [
      { id: "8-1", name: "Reverse Linked List", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "8-2", name: "Merge Two Sorted Lists", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "8-3", name: "LRU Cache", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 9,
    topic: "Hash Maps & Sets",
    description: "O(1) lookups and frequency counting patterns",
    icon: "#️⃣",
    completed: false,
    problems: [
      { id: "9-1", name: "Contains Duplicate", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "9-2", name: "Top K Frequent Elements", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "9-3", name: "Subarray Sum Equals K", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 10,
    topic: "Heaps & Priority Queues",
    description: "Heap operations and priority-based algorithms",
    icon: "⛰️",
    completed: false,
    problems: [
      { id: "10-1", name: "Kth Largest Element", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "10-2", name: "Merge K Sorted Lists", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "10-3", name: "Find Median from Data Stream", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 11,
    topic: "Recursion Basics",
    description: "Understand recursive thinking and base cases",
    icon: "🔄",
    completed: false,
    problems: [
      { id: "11-1", name: "Fibonacci Number", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "11-2", name: "Pow(x, n)", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "11-3", name: "Reverse String", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
    ]
  },
  {
    day: 12,
    topic: "Backtracking",
    description: "Generate all possibilities with constraint pruning",
    icon: "🌲",
    completed: false,
    problems: [
      { id: "12-1", name: "Subsets", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "12-2", name: "Permutations", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "12-3", name: "N-Queens", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 13,
    topic: "Binary Trees Basics",
    description: "Tree traversals and basic tree operations",
    icon: "🌳",
    completed: false,
    problems: [
      { id: "13-1", name: "Invert Binary Tree", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "13-2", name: "Maximum Depth of Binary Tree", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "13-3", name: "Same Tree", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
    ]
  },
  {
    day: 14,
    topic: "Binary Trees Advanced",
    description: "Complex tree algorithms and path problems",
    icon: "🎄",
    completed: false,
    problems: [
      { id: "14-1", name: "Binary Tree Level Order Traversal", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "14-2", name: "Construct Binary Tree from Preorder and Inorder", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "14-3", name: "Binary Tree Maximum Path Sum", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 15,
    topic: "Binary Search Trees",
    description: "BST properties, insertion, deletion, and validation",
    icon: "🔢",
    completed: false,
    problems: [
      { id: "15-1", name: "Validate Binary Search Tree", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "15-2", name: "Kth Smallest Element in a BST", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "15-3", name: "Lowest Common Ancestor of a BST", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 16,
    topic: "Tries",
    description: "Prefix trees for string-related problems",
    icon: "📝",
    completed: false,
    problems: [
      { id: "16-1", name: "Implement Trie", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "16-2", name: "Design Add and Search Words", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "16-3", name: "Word Search II", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 17,
    topic: "Graph Basics - BFS",
    description: "Breadth-first search and level-order traversal",
    icon: "🌐",
    completed: false,
    problems: [
      { id: "17-1", name: "Number of Islands", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "17-2", name: "Rotting Oranges", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "17-3", name: "Word Ladder", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 18,
    topic: "Graph Basics - DFS",
    description: "Depth-first search and connectivity problems",
    icon: "🔎",
    completed: false,
    problems: [
      { id: "18-1", name: "Clone Graph", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "18-2", name: "Pacific Atlantic Water Flow", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "18-3", name: "Course Schedule", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 19,
    topic: "Union Find",
    description: "Disjoint set union for connectivity queries",
    icon: "🔀",
    completed: false,
    problems: [
      { id: "19-1", name: "Number of Connected Components", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "19-2", name: "Redundant Connection", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "19-3", name: "Accounts Merge", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 20,
    topic: "Shortest Paths",
    description: "Dijkstra, Bellman-Ford, and weighted graphs",
    icon: "🛤️",
    completed: false,
    problems: [
      { id: "20-1", name: "Network Delay Time", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "20-2", name: "Cheapest Flights Within K Stops", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "20-3", name: "Path With Minimum Effort", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 21,
    topic: "DP - 1D Problems",
    description: "One-dimensional dynamic programming patterns",
    icon: "1️⃣",
    completed: false,
    problems: [
      { id: "21-1", name: "Climbing Stairs", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "21-2", name: "House Robber", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "21-3", name: "Longest Increasing Subsequence", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 22,
    topic: "DP - 2D Problems",
    description: "Grid-based and two-dimensional DP patterns",
    icon: "2️⃣",
    completed: false,
    problems: [
      { id: "22-1", name: "Unique Paths", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "22-2", name: "Longest Common Subsequence", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "22-3", name: "Edit Distance", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 23,
    topic: "DP - Knapsack",
    description: "0/1 Knapsack and unbounded knapsack variations",
    icon: "🎒",
    completed: false,
    problems: [
      { id: "23-1", name: "Partition Equal Subset Sum", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "23-2", name: "Coin Change", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "23-3", name: "Target Sum", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 24,
    topic: "DP - Intervals",
    description: "Interval DP and matrix chain multiplication",
    icon: "📏",
    completed: false,
    problems: [
      { id: "24-1", name: "Burst Balloons", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "24-2", name: "Palindrome Partitioning II", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "24-3", name: "Minimum Cost to Merge Stones", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 25,
    topic: "Greedy Algorithms",
    description: "Make optimal local choices for global optimum",
    icon: "💰",
    completed: false,
    problems: [
      { id: "25-1", name: "Jump Game", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "25-2", name: "Gas Station", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "25-3", name: "Task Scheduler", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 26,
    topic: "Bit Manipulation",
    description: "Binary operations and bitwise tricks",
    icon: "💻",
    completed: false,
    problems: [
      { id: "26-1", name: "Single Number", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "26-2", name: "Counting Bits", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "26-3", name: "Reverse Bits", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
    ]
  },
  {
    day: 27,
    topic: "Math & Number Theory",
    description: "Mathematical algorithms and number properties",
    icon: "🔢",
    completed: false,
    problems: [
      { id: "27-1", name: "Happy Number", platform: "LeetCode", difficulty: "Easy", link: "#", completed: false },
      { id: "27-2", name: "Pow(x, n)", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "27-3", name: "Multiply Strings", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
    ]
  },
  {
    day: 28,
    topic: "Segment Trees",
    description: "Range queries and point updates efficiently",
    icon: "📐",
    completed: false,
    problems: [
      { id: "28-1", name: "Range Sum Query - Mutable", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "28-2", name: "Count of Smaller Numbers After Self", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
      { id: "28-3", name: "The Skyline Problem", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 29,
    topic: "Codeforces Practice",
    description: "Mixed difficulty Codeforces problems",
    icon: "🏆",
    completed: false,
    problems: [
      { id: "29-1", name: "Watermelon", platform: "Codeforces", difficulty: "Easy", link: "#", completed: false },
      { id: "29-2", name: "Theatre Square", platform: "Codeforces", difficulty: "Easy", link: "#", completed: false },
      { id: "29-3", name: "Way Too Long Words", platform: "Codeforces", difficulty: "Easy", link: "#", completed: false },
    ]
  },
  {
    day: 30,
    topic: "Contest Simulation",
    description: "Timed practice with mixed problems",
    icon: "⏱️",
    completed: false,
    problems: [
      { id: "30-1", name: "Virtual Contest A", platform: "Codeforces", difficulty: "Medium", link: "#", completed: false },
      { id: "30-2", name: "Virtual Contest B", platform: "Codeforces", difficulty: "Medium", link: "#", completed: false },
      { id: "30-3", name: "Virtual Contest C", platform: "Codeforces", difficulty: "Hard", link: "#", completed: false },
    ]
  },
  {
    day: 31,
    topic: "Final Review",
    description: "Consolidate learning and identify weak areas",
    icon: "🎯",
    completed: false,
    problems: [
      { id: "31-1", name: "Review Problem Set A", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "31-2", name: "Review Problem Set B", platform: "LeetCode", difficulty: "Medium", link: "#", completed: false },
      { id: "31-3", name: "Review Problem Set C", platform: "LeetCode", difficulty: "Hard", link: "#", completed: false },
    ]
  },
];

// Contest data for the tracker
export interface Contest {
  id: string;
  name: string;
  platform: 'Codeforces' | 'LeetCode' | 'CodeChef' | 'AtCoder';
  startTime: Date;
  duration: string;
  link: string;
}

export const upcomingContests: Contest[] = [
  {
    id: "c1",
    name: "Codeforces Round #920 (Div. 2)",
    platform: "Codeforces",
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: "2 hours",
    link: "#"
  },
  {
    id: "c2",
    name: "LeetCode Weekly Contest 380",
    platform: "LeetCode",
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: "1.5 hours",
    link: "#"
  },
  {
    id: "c3",
    name: "CodeChef Starters 115",
    platform: "CodeChef",
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: "3 hours",
    link: "#"
  },
  {
    id: "c4",
    name: "AtCoder Beginner Contest 345",
    platform: "AtCoder",
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: "1 hour 40 min",
    link: "#"
  },
  {
    id: "c5",
    name: "Codeforces Educational Round 162",
    platform: "Codeforces",
    startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    duration: "2 hours",
    link: "#"
  },
];

// User stats for dashboard/profile
export interface UserStats {
  totalSolved: number;
  currentStreak: number;
  longestStreak: number;
  bestDay: string;
  rating: number;
  rank: string;
  problemsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  problemsByTopic: {
    topic: string;
    count: number;
  }[];
  dailySolves: {
    date: string;
    count: number;
  }[];
}

export const userStats: UserStats = {
  totalSolved: 156,
  currentStreak: 12,
  longestStreak: 23,
  bestDay: "2024-01-15",
  rating: 1847,
  rank: "Expert",
  problemsByDifficulty: {
    easy: 67,
    medium: 72,
    hard: 17,
  },
  problemsByTopic: [
    { topic: "Arrays", count: 28 },
    { topic: "Strings", count: 22 },
    { topic: "DP", count: 35 },
    { topic: "Graphs", count: 25 },
    { topic: "Trees", count: 18 },
    { topic: "Greedy", count: 15 },
    { topic: "Binary Search", count: 13 },
  ],
  dailySolves: [
    { date: "Mon", count: 3 },
    { date: "Tue", count: 5 },
    { date: "Wed", count: 2 },
    { date: "Thu", count: 4 },
    { date: "Fri", count: 6 },
    { date: "Sat", count: 8 },
    { date: "Sun", count: 4 },
  ],
};
