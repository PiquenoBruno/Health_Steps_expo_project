import { saveSteps } from "@/src/services/steps";
import { supabase } from "@/src/services/supabase";
import { getUserGoal } from "@/src/services/user";
import { User } from "@supabase/supabase-js";
import { useFocusEffect } from "expo-router";
import { Accelerometer } from "expo-sensors";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

export function useStepCounter(user: User | null) {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);

  const lastStepTime = useRef(0);
  const prevMagnitude = useRef(0);
  const lastSaved = useRef(0);

  // carregar passos
  useEffect(() => {
    async function loadTodaySteps() {
      if (!user) return;

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const { data } = await supabase
        .from("steps")
        .select("steps")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (data) {
        setSteps(data.steps);
      }
    }

    loadTodaySteps();
  }, [user]);

  // carregar meta
  useFocusEffect(
    useCallback(() => {
      async function loadGoal() {
        if (!user) return;

        const goalFromDb = await getUserGoal(user.id);
        setGoal(goalFromDb);
      }

      loadGoal();
    }, [user])
  );

  // sensor
  useEffect(() => {
    const subscription =
      Accelerometer.addListener((data) => {
        const { x, y, z } = data;

        const magnitude = Math.sqrt(
          x * x + y * y + z * z
        );

        const filtered = magnitude - 1;

        const now = Date.now();

        if (
          filtered > 0.2 &&
          prevMagnitude.current <= 0.2 &&
          now - lastStepTime.current > 400
        ) {
          setSteps((prev) => prev + 1);

          lastStepTime.current = now;
        }

        prevMagnitude.current = filtered;
      });

    Accelerometer.setUpdateInterval(100);

    return () => subscription.remove();
  }, []);

  // salvar
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        user &&
        steps > 0 &&
        steps !== lastSaved.current
      ) {
        saveSteps(user.id, steps);

        lastSaved.current = steps;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [steps, user]);

  const progress = Math.min(steps / goal, 1);

  function getMotivation() {
    if (progress === 0) return "Vamos começar!";
    if (progress < 0.25) return "Bora, você consegue!";
    if (progress < 0.5) return "Ótimo ritmo!";
    if (progress < 0.75) return "Já passou da metade!";
    if (progress < 1) return "Quase lá!";
    return "Meta atingida!";
  }

  return {
    steps,
    goal,
    progress,
    motivation: getMotivation(),
  };
}
