import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HistoryItem {
  date: string;
  steps: number;
}

interface Props {
  filteredHistory: HistoryItem[];
  visibleCount: number;
  setVisibleCount: (fn: (prev: number) => number) => void;
}

export default function HistoryList({
  filteredHistory,
  visibleCount,
  setVisibleCount,
}: Props) {
  return (
    <View>
      <Text style={styles.title}>Histórico</Text>

      {filteredHistory.slice(0, visibleCount).map((item) => (
        <View
          key={item.date}
          style={[
            styles.listItem,
            item.steps >= 10000 ? styles.successItem : styles.normalItem,
          ]}
        >
          <View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.steps}>{item.steps} passos</Text>
          </View>

          <MaterialIcons
            name={item.steps >= 10000 ? "check-circle" : "directions-walk"}
            size={24}
            color={item.steps >= 10000 ? "#2ecc71" : colors.color1}
          />
        </View>
      ))}

      {visibleCount < filteredHistory.length && (
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => setVisibleCount((prev) => prev + 10)}
          activeOpacity={0.8}
        >
          <Text style={styles.seeMoreText}>Carregar mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.color2,
    marginBottom: 10,
    marginLeft: 5,
  },

  listItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  successItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },

  normalItem: {
    borderLeftWidth: 4,
    borderLeftColor: colors.color1,
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },

  steps: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.color1,
  },

  seeMoreButton: {
    backgroundColor: colors.colorDestaque,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  seeMoreText: {
    color: "#fff",
    fontWeight: "700",
  },
});
