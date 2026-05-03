import { saveSteps } from "@/src/services/steps";
import { supabase } from "@/src/services/supabase";
import { User } from "@supabase/supabase-js";
import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from '../../constants/colors';

type Props = {
  user: User | null;
};

export default function StepCounter({ user }: Props) {
  const [steps, setSteps] = useState(0);

  const lastStepTime = useRef(0);
  const prevMagnitude = useRef(0);
  const lastSaved = useRef(0);

  // CARREGAR PASSOS DO DIA AO ABRIR
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

  // SENSOR DE PASSOS
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

  // SALVAR NO SUPABASE
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
    if (progress === 0) return "Vamos começar!";
    if (progress < 0.25) return "Bora, você consegue!";
    if (progress < 0.5) return "Ótimo ritmo, continue!";
    if (progress < 0.75) return "Já passou da metade!";
    if (progress < 1) return "Quase lá!";
    return "Parabéns! Meta atingida!";
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Seus passos hoje</Text>

      {/* Número de passos */}
      <Text style={styles.steps}>{steps}</Text>

      {/* Meta */}
      <Text style={styles.meta}>Meta: {goal} passos</Text>

      <Text style={styles.motivation}>{getMotivation(progress)}</Text>

      {/* Barra de progresso */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%`, backgroundColor: progress >= 1 ? "green" : "#00ffff" },
          ]}
        />
      </View>

      {/* porcentagem */}
      <Text style={styles.progess}>{Math.floor(progress * 100)}% da meta</Text>

      {/* mensagem */}
      {progress >= 1 && (
        <Text style={styles.goalReached}>Meta atingida!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textcolor1
  },
steps: {
  width: 200,
  height: 100,
  fontSize: 62,
  fontWeight: "bold",
  color: colors.textcolor1,
  backgroundColor: colors.color3,

  textAlign: "center",
  textAlignVertical: "center",

  borderRadius: 25,

  shadowColor: "#cbff6b",
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },

  elevation: 8,

  borderWidth: 3,
  borderColor: "rgba(200, 255, 0, 0.17)",
},
  meta: {
    marginBottom: 20,
    color: colors.textcolor1
  },
  motivation: {
    marginTop: 15,
    fontSize: 16,
    fontStyle: "italic",
    color: colors.textcolor1
  },
  progressBar: {
    width: 300,          
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
  },
  goalReached: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  progess: {
    color: colors.textcolor1
  }
});
