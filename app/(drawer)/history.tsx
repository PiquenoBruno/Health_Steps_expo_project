import StepsChart from "@/src/components/stepsChart/stepsChart";

import colors from "@/src/constants/colors";

import { useHistory } from "@/src/hooks/useHistory";

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function History() {
  const {
    user,
    history,
    loading,
  } = useHistory();

  // loading
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.colorDestaque}
        />
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
      <Text style={styles.header}>
        Seus passos
      </Text>

      {/* GRÁFICO */}
      <View style={styles.chartContainer}>
        <StepsChart />
      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>
        Histórico
      </Text>

      {/* LISTA */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.date}>
              {item.date}
            </Text>

            <Text style={styles.steps}>
              {item.steps} passos
            </Text>
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