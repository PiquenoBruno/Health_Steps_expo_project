import StepsChart from "@/src/components/stepsChart/stepsChart";
import { useAuth } from "@/src/hooks/useAuth";
import { supabase } from "@/src/services/supabase";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type Step = {
  date: string;
  steps: number;
};

export default function History() {
  const { user } = useAuth(); // 🔥 usa o mesmo estado global
  const [history, setHistory] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("steps")
        .select("date, steps")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.log("ERRO HISTÓRICO:", error.message);
      }

      setHistory(data || []);
      setLoading(false);
    }

    loadHistory();
  }, [user]); // 🔥 importante

  // ⏳ loading
  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 🚫 não logado
  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Você precisa estar logado</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>


      <StepsChart />

      
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Histórico
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text>
            {item.date} → {item.steps} passos
          </Text>
        )}
      />
    </View>
  );
}