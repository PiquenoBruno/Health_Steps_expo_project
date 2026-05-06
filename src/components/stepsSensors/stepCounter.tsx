import colors from "@/src/constants/colors";
import { useStepCounter } from "@/src/hooks/useStepCounter";
import { User } from "@supabase/supabase-js";
import { StyleSheet, Text, View } from "react-native";
import StatsCards from "../statsCards/statsCards";

type Props = {
  user: User | null;
};

export default function StepCounter({ user }: Props) {
  const {
    steps,
    goal,
    progress,
    motivation,
  } = useStepCounter(user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Seus passos hoje
      </Text>

      <Text style={styles.steps}>
        {steps}
      </Text>

      <Text style={styles.meta}>
        Meta: {goal} passos
      </Text>

      <Text style={styles.motivation}>
        {motivation}
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
              backgroundColor:
                progress >= 1
                  ? "green"
                  : "#00ffff",
            },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {Math.floor(progress * 100)}% da meta
      </Text>
      
      <StatsCards steps={steps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    borderRadius: 400,
    alignItems: "center",
    justifyContent: "center",
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
    color: colors.textcolor1,
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
    marginBottom: 10,
    color: colors.textcolor1,
  },
  motivation: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    color: colors.textcolor1,
  },
  progressBar: {
    width: 300,
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
  },
  progressText: {
    marginTop: 8,
    color: colors.textcolor1,
  },
  goalReached: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
});