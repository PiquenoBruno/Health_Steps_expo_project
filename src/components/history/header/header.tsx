import colors from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View>
      <Text style={styles.header}>Seus passos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: "bold", color: colors.color1, marginBottom: 10 },
});
