/**
 * TLE Eliminators CP-31 Sheet Data
 * Problems organized by rating with Codeforces links
 */

export interface TLEProblem {
  id: string;
  name: string;
  contestId: number;
  index: string;
  rating: number;
  link: string;
  tags: string[];
}

export interface RatingCategory {
  rating: number;
  problems: TLEProblem[];
}

// CP-31 Sheet problems organized by rating
export const tleCp31Problems: RatingCategory[] = [
  {
    rating: 800,
    problems: [
      { id: "800-1", name: "Halloumi Boxes", contestId: 1680, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1680/A", tags: ["brute force", "greedy"] },
      { id: "800-2", name: "Line Trip", contestId: 1901, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1901/A", tags: ["greedy", "math"] },
      { id: "800-3", name: "Make It Zero", contestId: 1869, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1869/A", tags: ["constructive"] },
      { id: "800-4", name: "Goals of Victory", contestId: 1914, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1914/A", tags: ["math"] },
      { id: "800-5", name: "Coins", contestId: 1814, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1814/A", tags: ["math"] },
      { id: "800-6", name: "Odd One Out", contestId: 1915, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1915/A", tags: ["bitmasks", "implementation"] },
      { id: "800-7", name: "Don't Try to Count", contestId: 1881, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1881/A", tags: ["brute force", "strings"] },
      { id: "800-8", name: "Sakurako's Exams", contestId: 2008, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/2008/A", tags: ["implementation", "math"] },
      { id: "800-9", name: "Forked!", contestId: 1904, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/1904/A", tags: ["brute force"] },
      { id: "800-10", name: "Channel", contestId: 1873, index: "B", rating: 800, link: "https://codeforces.com/problemset/problem/1873/B", tags: ["implementation"] },
      { id: "800-11", name: "Sum of Three", contestId: 1950, index: "C", rating: 800, link: "https://codeforces.com/problemset/problem/1950/C", tags: ["implementation", "math"] },
      { id: "800-12", name: "Watermelon", contestId: 4, index: "A", rating: 800, link: "https://codeforces.com/problemset/problem/4/A", tags: ["brute force", "math"] },
    ]
  },
  {
    rating: 900,
    problems: [
      { id: "900-1", name: "Bit++", contestId: 282, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/282/A", tags: ["implementation"] },
      { id: "900-2", name: "Boy or Girl", contestId: 236, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/236/A", tags: ["brute force", "implementation", "strings"] },
      { id: "900-3", name: "Next Round", contestId: 158, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/158/A", tags: ["implementation"] },
      { id: "900-4", name: "Beautiful Matrix", contestId: 263, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/263/A", tags: ["implementation"] },
      { id: "900-5", name: "Petya and Strings", contestId: 112, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/112/A", tags: ["implementation", "strings"] },
      { id: "900-6", name: "Football", contestId: 96, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/96/A", tags: ["implementation", "strings"] },
      { id: "900-7", name: "Magnets", contestId: 344, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/344/A", tags: ["implementation"] },
      { id: "900-8", name: "Tram", contestId: 116, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/116/A", tags: ["implementation"] },
      { id: "900-9", name: "Anton and Danik", contestId: 734, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/734/A", tags: ["implementation", "strings"] },
      { id: "900-10", name: "Bear and Big Brother", contestId: 791, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/791/A", tags: ["implementation"] },
      { id: "900-11", name: "Word", contestId: 59, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/59/A", tags: ["implementation", "strings"] },
      { id: "900-12", name: "Soldier and Bananas", contestId: 546, index: "A", rating: 900, link: "https://codeforces.com/problemset/problem/546/A", tags: ["brute force", "implementation", "math"] },
    ]
  },
  {
    rating: 1000,
    problems: [
      { id: "1000-1", name: "Way Too Long Words", contestId: 71, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/71/A", tags: ["strings"] },
      { id: "1000-2", name: "Theatre Square", contestId: 1, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/1/A", tags: ["math"] },
      { id: "1000-3", name: "Team", contestId: 231, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/231/A", tags: ["brute force", "greedy"] },
      { id: "1000-4", name: "George and Accommodation", contestId: 467, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/467/A", tags: ["implementation"] },
      { id: "1000-5", name: "Stones on the Table", contestId: 266, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/266/A", tags: ["implementation"] },
      { id: "1000-6", name: "Translation", contestId: 41, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/41/A", tags: ["implementation", "strings"] },
      { id: "1000-7", name: "Elephant", contestId: 617, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/617/A", tags: ["math"] },
      { id: "1000-8", name: "I Wanna Be the Guy", contestId: 469, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/469/A", tags: ["greedy", "implementation"] },
      { id: "1000-9", name: "Gravity Flip", contestId: 405, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/405/A", tags: ["greedy", "implementation", "sortings"] },
      { id: "1000-10", name: "Helpful Maths", contestId: 339, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/339/A", tags: ["greedy", "implementation", "sortings", "strings"] },
      { id: "1000-11", name: "Lucky Division", contestId: 122, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/122/A", tags: ["brute force", "number theory"] },
      { id: "1000-12", name: "Vanya and Fence", contestId: 677, index: "A", rating: 1000, link: "https://codeforces.com/problemset/problem/677/A", tags: ["implementation"] },
    ]
  },
  {
    rating: 1100,
    problems: [
      { id: "1100-1", name: "Arrival of the General", contestId: 144, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/144/A", tags: ["implementation"] },
      { id: "1100-2", name: "Is your horseshoe on the other hoof?", contestId: 228, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/228/A", tags: ["implementation"] },
      { id: "1100-3", name: "Insomnia cure", contestId: 148, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/148/A", tags: ["constructive algorithms", "implementation", "math"] },
      { id: "1100-4", name: "Young Physicist", contestId: 69, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/69/A", tags: ["implementation", "math"] },
      { id: "1100-5", name: "Ultra-Fast Mathematician", contestId: 61, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/61/A", tags: ["implementation"] },
      { id: "1100-6", name: "Puzzles", contestId: 337, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/337/A", tags: ["greedy"] },
      { id: "1100-7", name: "Queue at the School", contestId: 266, index: "B", rating: 1100, link: "https://codeforces.com/problemset/problem/266/B", tags: ["constructive algorithms", "graph matchings", "implementation", "shortest paths"] },
      { id: "1100-8", name: "String Task", contestId: 118, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/118/A", tags: ["implementation", "strings"] },
      { id: "1100-9", name: "Police Recruits", contestId: 427, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/427/A", tags: ["implementation"] },
      { id: "1100-10", name: "Expression", contestId: 479, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/479/A", tags: ["brute force", "math"] },
      { id: "1100-11", name: "Night at the Museum", contestId: 731, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/731/A", tags: ["implementation", "strings"] },
      { id: "1100-12", name: "Sinking Ship", contestId: 1215, index: "A", rating: 1100, link: "https://codeforces.com/problemset/problem/1215/A", tags: ["implementation", "sortings", "strings"] },
    ]
  },
  {
    rating: 1200,
    problems: [
      { id: "1200-1", name: "Soft Drinking", contestId: 151, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/151/A", tags: ["implementation", "math"] },
      { id: "1200-2", name: "Even Odds", contestId: 318, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/318/A", tags: ["math"] },
      { id: "1200-3", name: "Panoramix's Prediction", contestId: 80, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/80/A", tags: ["brute force"] },
      { id: "1200-4", name: "Dubstep", contestId: 208, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/208/A", tags: ["strings"] },
      { id: "1200-5", name: "Die Roll", contestId: 9, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/9/A", tags: ["math", "probabilities"] },
      { id: "1200-6", name: "Keyboard", contestId: 474, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/474/A", tags: ["implementation"] },
      { id: "1200-7", name: "IQ test", contestId: 25, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/25/A", tags: ["brute force"] },
      { id: "1200-8", name: "Beautiful Year", contestId: 271, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/271/A", tags: ["brute force"] },
      { id: "1200-9", name: "Chat room", contestId: 58, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/58/A", tags: ["greedy", "strings"] },
      { id: "1200-10", name: "Nearly Lucky Number", contestId: 110, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/110/A", tags: ["implementation"] },
      { id: "1200-11", name: "Presents", contestId: 136, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/136/A", tags: ["implementation"] },
      { id: "1200-12", name: "HQ9+", contestId: 133, index: "A", rating: 1200, link: "https://codeforces.com/problemset/problem/133/A", tags: ["implementation"] },
    ]
  },
  {
    rating: 1300,
    problems: [
      { id: "1300-1", name: "Twins", contestId: 160, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/160/A", tags: ["greedy", "sortings"] },
      { id: "1300-2", name: "Dragons", contestId: 230, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/230/A", tags: ["greedy", "sortings"] },
      { id: "1300-3", name: "Cows and Sequence", contestId: 283, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/283/A", tags: ["data structures", "implementation"] },
      { id: "1300-4", name: "Frog Jumps", contestId: 1324, index: "C", rating: 1300, link: "https://codeforces.com/problemset/problem/1324/C", tags: ["binary search", "greedy", "implementation"] },
      { id: "1300-5", name: "Balanced Team", contestId: 1133, index: "C", rating: 1300, link: "https://codeforces.com/problemset/problem/1133/C", tags: ["sortings", "two pointers"] },
      { id: "1300-6", name: "Golden System", contestId: 457, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/457/A", tags: ["brute force", "math"] },
      { id: "1300-7", name: "Two Tvs", contestId: 845, index: "B", rating: 1300, link: "https://codeforces.com/problemset/problem/845/B", tags: ["data structures", "greedy", "sortings"] },
      { id: "1300-8", name: "Sereja and Suffixes", contestId: 368, index: "B", rating: 1300, link: "https://codeforces.com/problemset/problem/368/B", tags: ["data structures", "dp"] },
      { id: "1300-9", name: "Array", contestId: 300, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/300/A", tags: ["brute force", "constructive algorithms", "implementation"] },
      { id: "1300-10", name: "Game With Sticks", contestId: 451, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/451/A", tags: ["implementation"] },
      { id: "1300-11", name: "Kefa and First Steps", contestId: 580, index: "A", rating: 1300, link: "https://codeforces.com/problemset/problem/580/A", tags: ["brute force", "dp", "implementation"] },
      { id: "1300-12", name: "Minimize the Permutation", contestId: 1256, index: "C", rating: 1300, link: "https://codeforces.com/problemset/problem/1256/C", tags: ["greedy"] },
    ]
  },
  {
    rating: 1400,
    problems: [
      { id: "1400-1", name: "Soldier and Badges", contestId: 546, index: "B", rating: 1400, link: "https://codeforces.com/problemset/problem/546/B", tags: ["brute force", "greedy", "implementation", "sortings"] },
      { id: "1400-2", name: "Berland Fair", contestId: 1073, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1073/C", tags: ["binary search", "greedy", "implementation"] },
      { id: "1400-3", name: "Lineland Mail", contestId: 567, index: "A", rating: 1400, link: "https://codeforces.com/problemset/problem/567/A", tags: ["implementation"] },
      { id: "1400-4", name: "Product of Three Numbers", contestId: 1294, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1294/C", tags: ["greedy", "math", "number theory"] },
      { id: "1400-5", name: "Ternary XOR", contestId: 1328, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1328/C", tags: ["greedy", "implementation"] },
      { id: "1400-6", name: "K-th Not Divisible by n", contestId: 1352, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1352/C", tags: ["binary search", "math"] },
      { id: "1400-7", name: "Number of Apartments", contestId: 1430, index: "B", rating: 1400, link: "https://codeforces.com/problemset/problem/1430/B", tags: ["brute force", "constructive algorithms", "math"] },
      { id: "1400-8", name: "Primes on Interval", contestId: 237, index: "B", rating: 1400, link: "https://codeforces.com/problemset/problem/237/B", tags: ["binary search", "math", "two pointers"] },
      { id: "1400-9", name: "Restoring Three Numbers", contestId: 1154, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1154/C", tags: ["math"] },
      { id: "1400-10", name: "Divisibility by Eight", contestId: 550, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/550/C", tags: ["brute force", "dp", "math"] },
      { id: "1400-11", name: "Candies", contestId: 1343, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1343/C", tags: ["binary search", "math"] },
      { id: "1400-12", name: "Yet Another Walking Robot", contestId: 1296, index: "C", rating: 1400, link: "https://codeforces.com/problemset/problem/1296/C", tags: ["data structures", "implementation"] },
    ]
  },
  {
    rating: 1500,
    problems: [
      { id: "1500-1", name: "Eugeny and Array", contestId: 302, index: "A", rating: 1500, link: "https://codeforces.com/problemset/problem/302/A", tags: ["implementation"] },
      { id: "1500-2", name: "Sort the Array", contestId: 451, index: "B", rating: 1500, link: "https://codeforces.com/problemset/problem/451/B", tags: ["implementation", "sortings"] },
      { id: "1500-3", name: "Registration System", contestId: 4, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/4/C", tags: ["data structures", "hashing", "implementation"] },
      { id: "1500-4", name: "Guess a number!", contestId: 416, index: "A", rating: 1500, link: "https://codeforces.com/problemset/problem/416/A", tags: ["greedy", "implementation"] },
      { id: "1500-5", name: "Array Rearrangement", contestId: 1445, index: "B", rating: 1500, link: "https://codeforces.com/problemset/problem/1445/B", tags: ["greedy", "sortings"] },
      { id: "1500-6", name: "Build Permutation", contestId: 1713, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/1713/C", tags: ["brute force", "constructive algorithms", "math"] },
      { id: "1500-7", name: "Mashmokh and Numbers", contestId: 414, index: "B", rating: 1500, link: "https://codeforces.com/problemset/problem/414/B", tags: ["constructive algorithms", "math", "number theory"] },
      { id: "1500-8", name: "Vika and Segments", contestId: 610, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/610/C", tags: ["constructive algorithms", "greedy", "sortings"] },
      { id: "1500-9", name: "Lucky Transformation", contestId: 145, index: "B", rating: 1500, link: "https://codeforces.com/problemset/problem/145/B", tags: ["binary search", "implementation", "strings"] },
      { id: "1500-10", name: "Division", contestId: 1445, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/1445/C", tags: ["math", "number theory"] },
      { id: "1500-11", name: "Fillomino 2", contestId: 1517, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/1517/C", tags: ["constructive algorithms", "dfs and similar", "greedy", "implementation"] },
      { id: "1500-12", name: "Number Game", contestId: 1370, index: "C", rating: 1500, link: "https://codeforces.com/problemset/problem/1370/C", tags: ["games", "greedy", "math"] },
    ]
  },
  {
    rating: 1600,
    problems: [
      { id: "1600-1", name: "Circular Dance", contestId: 1095, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1095/C", tags: ["implementation"] },
      { id: "1600-2", name: "Pipes", contestId: 1234, index: "D", rating: 1600, link: "https://codeforces.com/problemset/problem/1234/D", tags: ["dp", "implementation"] },
      { id: "1600-3", name: "Fox and Box Accumulation", contestId: 388, index: "A", rating: 1600, link: "https://codeforces.com/problemset/problem/388/A", tags: ["binary search", "greedy", "sortings"] },
      { id: "1600-4", name: "Maximum Median", contestId: 1201, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1201/C", tags: ["binary search", "greedy", "math", "sortings"] },
      { id: "1600-5", name: "XXXX", contestId: 1364, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1364/C", tags: ["brute force", "math", "two pointers"] },
      { id: "1600-6", name: "Three Displays", contestId: 987, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/987/C", tags: ["brute force", "dp", "implementation"] },
      { id: "1600-7", name: "Polycarp at the Radio", contestId: 723, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/723/C", tags: ["greedy", "sortings"] },
      { id: "1600-8", name: "Count Triangles", contestId: 1355, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1355/C", tags: ["binary search", "implementation", "math", "two pointers"] },
      { id: "1600-9", name: "Painting the Fence", contestId: 1132, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1132/C", tags: ["brute force"] },
      { id: "1600-10", name: "Little Pony and Expected Maximum", contestId: 453, index: "A", rating: 1600, link: "https://codeforces.com/problemset/problem/453/A", tags: ["probabilities"] },
      { id: "1600-11", name: "Maximum Product", contestId: 1435, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1435/C", tags: ["brute force", "dp", "greedy", "sortings"] },
      { id: "1600-12", name: "Compression and Expansion", contestId: 1523, index: "C", rating: 1600, link: "https://codeforces.com/problemset/problem/1523/C", tags: ["brute force", "data structures", "greedy", "trees"] },
    ]
  },
  {
    rating: 1700,
    problems: [
      { id: "1700-1", name: "Mocha and Red and Blue", contestId: 1559, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1559/C", tags: ["dp", "greedy"] },
      { id: "1700-2", name: "Phoenix and Beauty", contestId: 1348, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1348/C", tags: ["constructive algorithms", "data structures", "greedy"] },
      { id: "1700-3", name: "Parsa's Humongous Tree", contestId: 1528, index: "A", rating: 1700, link: "https://codeforces.com/problemset/problem/1528/A", tags: ["dfs and similar", "dp", "greedy", "trees"] },
      { id: "1700-4", name: "Keshi in Search of AmShZ", contestId: 1610, index: "D", rating: 1700, link: "https://codeforces.com/problemset/problem/1610/D", tags: ["dfs and similar", "dp", "graphs", "greedy", "implementation", "shortest paths"] },
      { id: "1700-5", name: "XOR and Favorite Number", contestId: 617, index: "E", rating: 1700, link: "https://codeforces.com/problemset/problem/617/E", tags: ["data structures"] },
      { id: "1700-6", name: "Balanced Stone Heaps", contestId: 1623, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1623/C", tags: ["binary search", "greedy"] },
      { id: "1700-7", name: "K-beautiful Strings", contestId: 1493, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1493/C", tags: ["brute force", "greedy", "strings"] },
      { id: "1700-8", name: "Summarize to the Power of Two", contestId: 1005, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1005/C", tags: ["brute force", "greedy", "implementation"] },
      { id: "1700-9", name: "Schedule Management", contestId: 1701, index: "D", rating: 1700, link: "https://codeforces.com/problemset/problem/1701/D", tags: ["binary search", "greedy", "implementation", "two pointers"] },
      { id: "1700-10", name: "Binary Deque", contestId: 1692, index: "E", rating: 1700, link: "https://codeforces.com/problemset/problem/1692/E", tags: ["binary search", "implementation", "two pointers"] },
      { id: "1700-11", name: "Make It Round", contestId: 1759, index: "E", rating: 1700, link: "https://codeforces.com/problemset/problem/1759/E", tags: ["brute force", "greedy", "number theory"] },
      { id: "1700-12", name: "Helping the Nature", contestId: 1700, index: "C", rating: 1700, link: "https://codeforces.com/problemset/problem/1700/C", tags: ["constructive algorithms", "greedy"] },
    ]
  },
  {
    rating: 1800,
    problems: [
      { id: "1800-1", name: "New Year's Eve", contestId: 912, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/912/D", tags: ["bitmasks", "constructive algorithms"] },
      { id: "1800-2", name: "Yet Another Counting Problem", contestId: 1342, index: "C", rating: 1800, link: "https://codeforces.com/problemset/problem/1342/C", tags: ["math", "number theory"] },
      { id: "1800-3", name: "Classy Numbers", contestId: 1036, index: "C", rating: 1800, link: "https://codeforces.com/problemset/problem/1036/C", tags: ["combinatorics", "dp"] },
      { id: "1800-4", name: "Polycarp's Phone Book", contestId: 858, index: "C", rating: 1800, link: "https://codeforces.com/problemset/problem/858/C", tags: ["data structures", "implementation", "sortings"] },
      { id: "1800-5", name: "Berpizza", contestId: 1468, index: "H", rating: 1800, link: "https://codeforces.com/problemset/problem/1468/H", tags: ["data structures", "implementation"] },
      { id: "1800-6", name: "Restore Permutation", contestId: 1208, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/1208/D", tags: ["binary search", "data structures", "greedy"] },
      { id: "1800-7", name: "Array Shrinking", contestId: 1312, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/1312/D", tags: ["dp", "greedy"] },
      { id: "1800-8", name: "Minimum Euler Cycle", contestId: 1334, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/1334/D", tags: ["graphs", "greedy", "implementation"] },
      { id: "1800-9", name: "Count the Arrays", contestId: 1312, index: "C", rating: 1800, link: "https://codeforces.com/problemset/problem/1312/C", tags: ["combinatorics", "math"] },
      { id: "1800-10", name: "Palindrome Pairs", contestId: 159, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/159/D", tags: ["brute force", "dp", "hashing", "strings"] },
      { id: "1800-11", name: "Berland Music", contestId: 1622, index: "C", rating: 1800, link: "https://codeforces.com/problemset/problem/1622/C", tags: ["data structures", "greedy", "sortings"] },
      { id: "1800-12", name: "Board Moves", contestId: 1353, index: "D", rating: 1800, link: "https://codeforces.com/problemset/problem/1353/D", tags: ["math"] },
    ]
  },
  {
    rating: 1900,
    problems: [
      { id: "1900-1", name: "Interesting Sum", contestId: 1648, index: "B", rating: 1900, link: "https://codeforces.com/problemset/problem/1648/B", tags: ["greedy", "implementation", "sortings"] },
      { id: "1900-2", name: "Vasya and Golden Ticket", contestId: 1030, index: "C", rating: 1900, link: "https://codeforces.com/problemset/problem/1030/C", tags: ["brute force", "implementation"] },
      { id: "1900-3", name: "LRU", contestId: 698, index: "B", rating: 1900, link: "https://codeforces.com/problemset/problem/698/B", tags: ["probabilities"] },
      { id: "1900-4", name: "Bear and Compressing", contestId: 653, index: "C", rating: 1900, link: "https://codeforces.com/problemset/problem/653/C", tags: ["bitmasks", "brute force", "dfs and similar", "dp", "hashing", "strings"] },
      { id: "1900-5", name: "Petr and Permutations", contestId: 986, index: "D", rating: 1900, link: "https://codeforces.com/problemset/problem/986/D", tags: ["math"] },
      { id: "1900-6", name: "Subsequences", contestId: 597, index: "C", rating: 1900, link: "https://codeforces.com/problemset/problem/597/C", tags: ["data structures", "dp"] },
      { id: "1900-7", name: "Magic Gems", contestId: 1117, index: "D", rating: 1900, link: "https://codeforces.com/problemset/problem/1117/D", tags: ["dp", "matrices", "math"] },
      { id: "1900-8", name: "Masha and Cactus", contestId: 1199, index: "D", rating: 1900, link: "https://codeforces.com/problemset/problem/1199/D", tags: ["data structures", "dp", "trees"] },
      { id: "1900-9", name: "Longest Regular Bracket Sequence", contestId: 5, index: "C", rating: 1900, link: "https://codeforces.com/problemset/problem/5/C", tags: ["constructive algorithms", "data structures", "dp", "greedy", "sortings", "strings"] },
      { id: "1900-10", name: "Parsa's Humongous Tree", contestId: 1528, index: "B", rating: 1900, link: "https://codeforces.com/problemset/problem/1528/B", tags: ["dfs and similar", "dp", "greedy", "trees"] },
      { id: "1900-11", name: "Xor on Figures", contestId: 1270, index: "F", rating: 1900, link: "https://codeforces.com/problemset/problem/1270/F", tags: ["bitmasks", "brute force", "matrices"] },
      { id: "1900-12", name: "Another Sith Tournament", contestId: 678, index: "E", rating: 1900, link: "https://codeforces.com/problemset/problem/678/E", tags: ["bitmasks", "dp", "probabilities"] },
    ]
  },
];

// Get all problems as a flat array
export const getAllProblems = (): TLEProblem[] => {
  return tleCp31Problems.flatMap(category => category.problems);
};

// Get problems by rating
export const getProblemsByRating = (rating: number): TLEProblem[] => {
  const category = tleCp31Problems.find(c => c.rating === rating);
  return category?.problems || [];
};

// Available ratings
export const availableRatings = tleCp31Problems.map(c => c.rating);
