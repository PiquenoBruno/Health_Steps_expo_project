import { supabase } from "@/src/services/supabase";
import {
    getUserGoal,
    updateUserGoal,
} from "@/src/services/user";

import { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

export function useProfile(user: User | null) {
  const [goal, setGoal] = useState(10000);

  const [newGoal, setNewGoal] = useState("");

  const [loading, setLoading] = useState(false);

  const [bestDay, setBestDay] = useState(0);

  const [avgSteps, setAvgSteps] = useState(0);

  // carregar meta
  useEffect(() => {
    async function loadGoal() {
      if (!user) return;

      const g = await getUserGoal(user.id);

      setGoal(g);
    }

    loadGoal();
  }, [user]);

  // carregar estatísticas
  useEffect(() => {
    async function loadStats() {
      if (!user) return;

      const { data } = await supabase
        .from("steps")
        .select("steps")
        .eq("user_id", user.id);

      if (!data || data.length === 0) return;

      const values = data.map((d) => d.steps);

      const best = Math.max(...values);

      const avg = Math.floor(
        values.reduce((a, b) => a + b, 0)
        / values.length
      );

      setBestDay(best);

      setAvgSteps(avg);
    }

    loadStats();
  }, [user]);

  // atualizar meta
  async function handleUpdateGoal() {
    if (!user) return;

    const goalNumber = Number(newGoal);

    if (!goalNumber || goalNumber < 1000) {
      return;
    }

    setLoading(true);

    const { error } = await updateUserGoal(
      user.id,
      goalNumber
    );

    setLoading(false);

    if (!error) {
      setGoal(goalNumber);

      setNewGoal("");
    }
  }

  return {
    goal,
    newGoal,
    setNewGoal,
    loading,
    bestDay,
    avgSteps,
    handleUpdateGoal,
  };
}
