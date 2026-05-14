import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { useProfile } from "@/src/hooks/useProfile";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();
  const {
    goal,
    newGoal,
    setNewGoal,
    loading,
    bestDay,
    avgSteps,
    handleUpdateGoal,
  } = useProfile(user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedText}>Você precisa estar logado</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert("Sair da conta", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://ui-avatars.com/api/?name=" + user.email }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* META */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Meta diária</Text>
        <Text style={styles.value}>{goal} passos</Text>

        <TextInput
          value={newGoal}
          onChangeText={setNewGoal}
          placeholder="Nova meta"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#fff",
  },

  title: { fontSize: 24, fontWeight: "bold", color: colors.color1 },

  email: { fontSize: 14, color: colors.color2, marginTop: 2 },

  card: {
    backgroundColor: colors.color2,
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
    color: colors.textcolor1,
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
    backgroundColor: colors.color3,
  },

  saveButton: {
    backgroundColor: colors.colorDestaque,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  disabledButton: { opacity: 0.6 },

  saveButtonText: { color: "#fff", fontWeight: "bold" },

  stat: { fontSize: 16, marginBottom: 5, color: colors.textcolor1 },

  logoutButton: {
    backgroundColor: colors.colorAlert,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: { color: "#fff", fontWeight: "bold" },

  notLoggedText: {
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: colors.colorAlert,
  },
});
