import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CodeforcesSubmission {
  id: number;
  contestId: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
  };
  verdict: string;
  creationTimeSeconds: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { handle } = await req.json();
    
    if (!handle) {
      console.log("No handle provided");
      return new Response(
        JSON.stringify({ error: "Codeforces handle is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching submissions for handle: ${handle}`);

    // Fetch user submissions from Codeforces API
    const cfResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
    );

    if (!cfResponse.ok) {
      console.log(`Codeforces API error: ${cfResponse.status}`);
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Codeforces API" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cfData = await cfResponse.json();

    if (cfData.status !== "OK") {
      console.log(`Codeforces API returned error: ${cfData.comment}`);
      return new Response(
        JSON.stringify({ error: cfData.comment || "Codeforces API error" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Filter for accepted submissions only
    const acceptedSubmissions = cfData.result.filter(
      (sub: CodeforcesSubmission) => sub.verdict === "OK"
    );

    // Get unique solved problems
    const solvedProblems = new Map<string, {
      name: string;
      rating: number | null;
      contestId: number;
      index: string;
      solvedAt: number;
    }>();

    for (const sub of acceptedSubmissions) {
      const key = `${sub.contestId}-${sub.problem.index}`;
      if (!solvedProblems.has(key)) {
        solvedProblems.set(key, {
          name: sub.problem.name,
          rating: sub.problem.rating || null,
          contestId: sub.contestId,
          index: sub.problem.index,
          solvedAt: sub.creationTimeSeconds,
        });
      }
    }

    const problemsArray = Array.from(solvedProblems.values());
    
    console.log(`Found ${problemsArray.length} unique solved problems for ${handle}`);

    // Get user info for rating
    const userInfoResponse = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    
    let userRating = null;
    let userRank = null;
    
    if (userInfoResponse.ok) {
      const userInfoData = await userInfoResponse.json();
      if (userInfoData.status === "OK" && userInfoData.result.length > 0) {
        userRating = userInfoData.result[0].rating;
        userRank = userInfoData.result[0].rank;
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        handle,
        totalSolved: problemsArray.length,
        problems: problemsArray,
        rating: userRating,
        rank: userRank
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in sync-codeforces function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
