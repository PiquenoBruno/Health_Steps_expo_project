import StepsChart from "@/src/components/stepsChart/stepsChart";
import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { supabase } from "@/src/services/supabase";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Step = {
  date: string;
  steps: number;
};

export default function History() {
  const { user } = useAuth();
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
  }, [user]);

  // loading
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.colorDestaque} />
      </View>
    );
  }

  // não logado
  if (!user) {
    return (
      <View style={styles.notLogged}>
        <Text style={styles.notLoggedText}>
          Você precisa estar logado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Seus passos</Text>

      {/* GRÁFICO */}
      <View style={styles.chartContainer}>
        <StepsChart />
      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>Histórico</Text>

      {/* LISTA */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.steps}>{item.steps} passos</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.color1,
    marginBottom: 10,
  },  

  chartContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.color1,
    borderRadius: 20,


    
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },


    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.color2,
    marginBottom: 10,
    marginLeft: 5,
  },

  listItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },

    elevation: 0.5,
  },

  date: {
    fontSize: 14,
    color: colors.color3,
  },

  steps: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.color1,
  },

  listItemText: {
    fontSize: 16,
    color: colors.color2,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  notLogged: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  notLoggedText: {
    fontSize: 16,
    color: colors.colorAlert,
    fontWeight: "bold",
  },
});