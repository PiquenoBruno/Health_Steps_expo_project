import { useAuth } from "@/src/hooks/useAuth";
import { supabase } from "@/src/services/supabase";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function StepsChart() {
  const { user } = useAuth();
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function loadChart() {
      if (!user) return;

      //  últimos 7 dias
      const today = new Date();
      const dates: string[] = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
      }

      //  buscar dados do banco
      const { data: stepsData } = await supabase
        .from("steps")
        .select("date, steps")
        .eq("user_id", user.id);

      //  organizar dados
      const stepsMap: any = {};
      stepsData?.forEach((item) => {
        stepsMap[item.date] = item.steps;
      });

      const formattedData = dates.map((date) => stepsMap[date] || 0);
      const formattedLabels = dates.map((date) =>
        new Date(date).getDate().toString()
      );

      setData(formattedData);
      setLabels(formattedLabels);
    }

    loadChart();
  }, [user]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Últimos 7 dias
      </Text>

      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data.length ? data : [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: () => "#000",
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}
