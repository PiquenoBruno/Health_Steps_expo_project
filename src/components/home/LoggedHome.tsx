import StepCounter from "@/src/components/stepsSensors/stepCounter";
import colors from "@/src/constants/colors";
import { User } from "@supabase/supabase-js";
import { StyleSheet, View } from "react-native";

type Props = {
  user: User;
};

export default function LoggedHome({ user }: Props) {
  return (
    <View style={styles.container}>
      <StepCounter user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    marginBottom: 20,
    opacity: 0.7,
  },
});