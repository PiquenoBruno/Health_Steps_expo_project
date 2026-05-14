import colors from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  totalSteps: number;
  avgSteps: number;
}

export default function SummaryCard({ totalSteps, avgSteps }: Props) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryText}>📊 Total: {totalSteps} passos</Text>
      <Text style={styles.summaryText}>📈 Média: {avgSteps} passos/dia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: { backgroundColor: colors.color2, padding: 15, borderRadius: 12, marginBottom: 15 },
  summaryText: { fontSize: 16, fontWeight: "600", color: colors.textcolor1, marginBottom: 5 },
});
