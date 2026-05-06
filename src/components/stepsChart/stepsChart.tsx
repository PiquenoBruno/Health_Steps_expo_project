import colors from "@/src/constants/colors";
import { useStepsChart } from "@/src/hooks/useStepsChart";


import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

export default function StepsChart() {
  const {
    data,
    labels,
    loading,
  } = useStepsChart();

  if (loading) {
    return (
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#4CAF50"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 40,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: colors.textcolor1,
        }}
      >
        Últimos 7 dias
      </Text>

      <LineChart
        data={{
          labels,

          datasets: [
            {
              data: data.length
                ? data
                : [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        }}
        width={
          Dimensions.get("window").width - 40
        }
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(76, 175, 80, ${opacity})`,

          labelColor: () => "#000",

          style: {
            borderRadius: 22,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}
