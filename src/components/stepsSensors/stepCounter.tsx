import { saveSteps } from "@/src/services/steps";
import { supabase } from "@/src/services/supabase";
import { User } from "@supabase/supabase-js";
import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

type Props = {
  user: User | null;
};

export default function StepCounter({ user }: Props) {
  const [steps, setSteps] = useState(0);

  const lastStepTime = useRef(0);
  const prevMagnitude = useRef(0);
  const lastSaved = useRef(0);

  // 1. CARREGAR PASSOS DO DIA AO ABRIR
  useEffect(() => {
    async function loadTodaySteps() {
      if (!user) return;

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("steps")
        .select("steps")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (error) {
        console.log("Erro ao buscar steps:", error.message);
        return;
      }

      if (data) {
        setSteps(data.steps);
      }
    }

    loadTodaySteps();
  }, [user]);

  // 2. SENSOR DE PASSOS (PRECISÃO MELHORADA)
  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
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

  // 3. SALVAR NO SUPABASE (EVITA SPAM)
  useEffect(() => {
    const interval = setInterval(() => {
      if (user && steps > 0 && steps !== lastSaved.current) {
        saveSteps(user.id, steps);
        lastSaved.current = steps;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [steps, user]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Passos: {steps}
      </Text>
    </View>
  );
}