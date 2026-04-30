import { supabase } from "@/src/services/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Step = {
  date: string;
  steps: number;
};

export default function History() {
  const [history, setHistory] = useState<Step[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUserAndHistory() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;

      if (!currentUser) return;

      setUser(currentUser);

      const { data: historyData } = await supabase
        .from("steps")
        .select("date, steps")
        .eq("user_id", currentUser.id)
        .order("date", { ascending: false });

      setHistory(historyData || []);
    }

    loadUserAndHistory();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Histórico de Passos
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text>
            📅 {new Date(item.date).toLocaleDateString()} → {item.steps} passos
          </Text>
        )}
      />
    </View>
  );
}
