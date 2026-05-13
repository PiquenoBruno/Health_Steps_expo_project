import { saveSteps } from "@/src/services/steps";
import { supabase } from "@/src/services/supabase";
import { getUserGoal } from "@/src/services/user";
import { detectStep } from "@/src/utils/stepDetection/stepDetection";

import { User } from "@supabase/supabase-js";

import { useFocusEffect } from "expo-router";
import { Accelerometer } from "expo-sensors";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { motivationalMessages } from "../components/motivationalMessages/motivationalMessages";

export function useStepCounter(user: User | null) {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);

  const [motivation, setMotivation] = useState("");
  const [currentLevel, setCurrentLevel] =
    useState("");

  const lastStepTime = useRef(0);
  const prevMagnitude = useRef(0);
  const lastSaved = useRef(0);

  // carregar passos do dia
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

        const goalFromDb = await getUserGoal(
          user.id
        );

        setGoal(goalFromDb);
      }

      loadGoal();
    }, [user])
  );

  // sensor acelerômetro
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription =
      Accelerometer.addListener((data) => {
        const { x, y, z } = data;

        const magnitude = Math.sqrt(
          x * x + y * y + z * z
        );

        const now = Date.now();

        const result = detectStep({
          magnitude,
          previousMagnitude:
            prevMagnitude.current,
          lastStepTime:
            lastStepTime.current,
          now,
        });

        if (result.detected) {
          setSteps((prev) => prev + 1);

          lastStepTime.current = now;
        }

        prevMagnitude.current =
          result.filtered;
      });

    return () => {
      subscription.remove();
    };
  }, []);

  // salvar passos automaticamente
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

  // progresso
  const progress = Math.min(
    steps / goal,
    1
  );

  // nível do progresso
  function getProgressLevel(
    progress: number
  ) {
    if (progress === 0) return "start";

    if (progress < 0.5) return "low";

    if (progress < 0.8) return "medium";

    if (progress < 1) return "high";

    return "done";
  }

  // frase motivacional
  function getMotivation(
    progress: number
  ) {
    const level =
      getProgressLevel(progress);

    let messages: string[] = [];

    if (level === "start") {
      messages =
        motivationalMessages.start;
    }

    if (level === "low") {
      messages =
        motivationalMessages.low;
    }

    if (level === "medium") {
      messages =
        motivationalMessages.medium;
    }

    if (level === "high") {
      messages =
        motivationalMessages.high;
    }

    if (level === "done") {
      messages =
        motivationalMessages.done;
    }

    return messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];
  }

  // atualizar motivação
  useEffect(() => {
    const level =
      getProgressLevel(progress);

    if (level !== currentLevel) {
      setCurrentLevel(level);

      setMotivation(
        getMotivation(progress)
      );
    }
  }, [steps]);

  return {
    steps,
    goal,
    progress,
    motivation,
  };
}