import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
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

  // carregar meta
  useEffect(() => {
    async function loadGoal() {
      if (!user) return;

      const g = await getUserGoal(user.id);
      setGoal(g);
    }

    loadGoal();
  }, [user]);

  // atualizar meta
  async function handleUpdateGoal() {
    if (!user) return;

    const goalNumber = Number(newGoal);

    if (!goalNumber || goalNumber < 1000) {
      return;
    }

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
        <Text style={styles.notLoggedText}>Você precisa estar logado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>:)</Text>

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user.email}</Text>

      {/* META ATUAL */}
      <Text style={styles.label}>Meta atual</Text>
      <Text style={styles.value}>{goal} passos</Text>

      {/* ALTERAR META */}
      <Text style={styles.label}>Nova meta</Text>
      <TextInput
        value={newGoal}
        onChangeText={setNewGoal}
        placeholder="Ex: 8000"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdateGoal}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? "Salvando..." : "Salvar meta"}
        </Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.color1,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: colors.color2,
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.color3,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.color3,
    borderRadius: 12,
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "#fff",

    // sombra leve
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  saveButton: {
    backgroundColor: colors.color1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: colors.colorAlert,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  notLoggedText: {
    fontSize: 16,
    color: colors.colorAlert,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});
