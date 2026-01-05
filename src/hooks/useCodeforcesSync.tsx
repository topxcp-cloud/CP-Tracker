import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CodeforcesData {
  totalSolved: number;
  problems: Array<{
    name: string;
    rating: number | null;
    contestId: number;
    index: string;
    solvedAt: number;
  }>;
  rating: number | null;
  rank: string | null;
}

export const useCodeforcesSync = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CodeforcesData | null>(null);
  const { toast } = useToast();

  const syncFromCodeforces = async (handle: string) => {
    if (!handle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Codeforces handle",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      const { data: response, error } = await supabase.functions.invoke('sync-codeforces', {
        body: { handle },
      });

      if (error) {
        throw error;
      }

      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return null;
      }

      setData(response);
      toast({
        title: "Success!",
        description: `Synced ${response.totalSolved} solved problems from Codeforces`,
      });
      
      return response;
    } catch (error: any) {
      console.error('Error syncing Codeforces data:', error);
      toast({
        title: "Error",
        description: "Failed to sync from Codeforces. Please check your handle.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { syncFromCodeforces, loading, data };
};
