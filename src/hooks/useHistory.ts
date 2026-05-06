import { useAuth } from "@/src/hooks/useAuth";

import { getHistory } from "@/src/services/steps";

import { useEffect, useState } from "react";

type Step = {
  date: string;
  steps: number;
};

export function useHistory() {
  const { user } = useAuth();

  const [history, setHistory] = useState<Step[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } =
        await getHistory(user.id);

      if (error) {
        console.log(error.message);
      }

      setHistory(data || []);

      setLoading(false);
    }

    loadHistory();
  }, [user]);

  return {
    user,
    history,
    loading,
  };
}