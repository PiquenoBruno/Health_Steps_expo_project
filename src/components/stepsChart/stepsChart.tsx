import { useAuth } from "@/src/hooks/useAuth";
import { supabase } from "@/src/services/supabase";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function StepsChart() {
  const { user } = useAuth();
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChart() {
      if (!user) return;

      setLoading(true);

      const today = new Date();
      const dates: string[] = [];

      //últimos 7 dias
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
      }

      //buscar dados apenas dos últimos 7 dias
      const { data: stepsData, error } = await supabase
        .from("steps")
        .select("date, steps")
        .eq("user_id", user.id)
        .gte("date", dates[0]);

      if (error) {
        console.error(error);
        setData([0, 0, 0, 0, 0, 0, 0]);
        setLabels(dates.map((date) => new Date(date).getDate().toString()));
        setLoading(false);
        return;
      }

      //organizar dados
      const stepsMap: Record<string, number> = {};
      stepsData?.forEach((item) => {
        stepsMap[item.date] = item.steps;
      });

      const formattedData = dates.map((date) => stepsMap[date] || 0);
      const formattedLabels = dates.map((date) =>
        new Date(date).getDate().toString()
      );

      setData(formattedData);
      setLabels(formattedLabels);
      setLoading(false);
    }

    loadChart();
  }, [user]);

  if (loading) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20, marginBottom: 40, alignItems: "center" }}>
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
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
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
