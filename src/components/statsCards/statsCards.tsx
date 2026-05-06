import colors from "@/src/constants/colors";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  steps: number;
};

export default function StatsCards({
  steps,
}: Props) {
  const distanceKm = (
    (steps * 0.75) /
    1000
  ).toFixed(2);

  const calories = Math.floor(
    steps * 0.04
  );

  const activeMinutes = Math.floor(
    steps / 100
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.value}>
          {distanceKm}
        </Text>

        <Text style={styles.label}>
          km
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.value}>
          {calories}
        </Text>

        <Text style={styles.label}>
          kcal
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.value}>
          {activeMinutes}
        </Text>

        <Text style={styles.label}>
          min
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  card: {
    backgroundColor: colors.color3,

    flex: 1,

    paddingVertical: 15,

    borderRadius: 16,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textcolor1,
  },

  label: {
    marginTop: 5,
    fontSize: 13,
    color: colors.textcolor1,
    opacity: 0.7,
  },
});
