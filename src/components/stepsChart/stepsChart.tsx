import colors from "@/src/constants/colors";
import { useStepsChart } from "@/src/hooks/useStepsChart";

import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

export default function StepsChart() {
  const { data, loading } = useStepsChart();

  const screenWidth = Dimensions.get("window").width;

  const safeData = data?.length
    ? data
    : [0, 0, 0, 0, 0, 0, 0];

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Gera labels dinâmicos para os últimos 7 dias
  const hoje = new Date();
  const safeLabels = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(hoje.getDate() - (6 - i)); // últimos 7 dias em ordem
    return diasSemana[d.getDay()];
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.color1}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Últimos 7 dias
      </Text>

      <LineChart
        data={{
          labels: safeLabels,
          datasets: [
            {
              data: safeData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        fromZero
        bezier
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(167, 205, 44, ${opacity})`,

          labelColor: () => "#333",

          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#fff",
            fill: colors.color1,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  container: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.color1,
  },

  chart: {
    borderRadius: 16,
  },
});
