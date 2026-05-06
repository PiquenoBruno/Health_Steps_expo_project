import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { supabase } from "@/src/services/supabase";
import { getUserGoal, updateUserGoal } from "@/src/services/user";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();

  const [goal, setGoal] = useState(10000);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const [bestDay, setBestDay] = useState(0);
  const [avgSteps, setAvgSteps] = useState(0);

  //  carregar meta
  useEffect(() => {
    async function loadGoal() {
      if (!user) return;
      const g = await getUserGoal(user.id);
      setGoal(g);
    }

    loadGoal();
  }, [user]);

  //  carregar estatísticas
  useEffect(() => {
    async function loadStats() {
      if (!user) return;

      const { data } = await supabase
        .from("steps")
        .select("steps")
        .eq("user_id", user.id);

      if (!data || data.length === 0) return;

      const values = data.map((d) => d.steps);

      const best = Math.max(...values);
      const avg = Math.floor(
        values.reduce((a, b) => a + b, 0) / values.length
      );

      setBestDay(best);
      setAvgSteps(avg);
    }

    loadStats();
  }, [user]);

  //  atualizar meta
  async function handleUpdateGoal() {
    if (!user) return;

    const goalNumber = Number(newGoal);

    if (!goalNumber || goalNumber < 1000) return;

    setLoading(true);

    const { error } = await updateUserGoal(user.id, goalNumber);

    setLoading(false);

    if (!error) {
      setGoal(goalNumber);
      setNewGoal("");
    }
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedText}>
          Você precisa estar logado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* META */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Meta diária</Text>
        <Text style={styles.value}>{goal} passos</Text>

        <TextInput
          value={newGoal}
          onChangeText={setNewGoal}
          placeholder="Nova meta (ex: 8000)"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateGoal}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Salvando..." : "Atualizar meta"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ESTATÍSTICAS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Estatísticas</Text>

        <Text style={styles.stat}>🔥 Melhor dia: {bestDay}</Text>
        <Text style={styles.stat}>📈 Média: {avgSteps}</Text>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.color1,
  },

  email: {
    fontSize: 14,
    color: colors.color2,
    marginTop: 5,
  },

  card: {
    backgroundColor: colors.color1,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textcolor1
  },

  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textcolor1,
  },

  input: {
    borderRadius: 22,
    padding: 10,
    marginBottom: 10,
    color: colors.textcolor1,
    backgroundColor: colors.color3
  },

  saveButton: {
    backgroundColor: colors.colorDestaque,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  stat: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.textcolor1
  },

  logoutButton: {
    backgroundColor: colors.colorAlert,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  notLoggedText: {
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: colors.colorAlert,
  },
});