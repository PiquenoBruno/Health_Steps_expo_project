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

  //CARREGAR PASSOS DO DIA AO ABRIR
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

  // SENSOR DE PASSOS (PRECISÃO MELHORADA)
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

  // SALVAR NO SUPABASE (EVITA SPAM)
  useEffect(() => {
    const interval = setInterval(() => {
      if (user && steps > 0 && steps !== lastSaved.current) {
        saveSteps(user.id, steps);
        lastSaved.current = steps;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [steps, user]);

const goal = 10000;
const progress = Math.min(steps / goal, 1);


function getMotivation(progress: number) {
  if (progress === 0) return "Vamos começar! 🚀";
  if (progress < 0.25) return "Bora, você consegue! 💪";
  if (progress < 0.5) return "Ótimo ritmo, continue! 🔥";
  if (progress < 0.75) return "Já passou da metade! 👏";
  if (progress < 1) return "Quase lá! 🚀";
  return "Parabéns! Meta atingida! 🎉";
}


return (
  <View style={{ padding: 20 }}>
    {/*  Título */}
    <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
      Seus passos hoje
    </Text>

    {/*  Número de passos */}
    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
      {steps}
    </Text>

    {/*  Meta */}
    <Text style={{ marginBottom: 20 }}>
      Meta: {goal} passos
    </Text>


    <Text style={{ marginTop: 15, fontSize: 16, fontStyle: "italic" }}>
      {getMotivation(progress)}
    </Text>

    {/*  Barra de progresso */}
    <View
      style={{
        height: 20,
        backgroundColor: "#ddd",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: progress >= 1 ? "green" : "#4CAF50",
        }}
      />
    </View>

    {/*  porcentagem */}
    <Text>
      {Math.floor(progress * 100)}% da meta
    </Text>

    {/*  mensagem */}
    {progress >= 1 && (
      <Text style={{ marginTop: 10, color: "green", fontWeight: "bold" }}>
         Meta atingida!
      </Text>
    )}
  </View>
);
}