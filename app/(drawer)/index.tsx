import AuthForm from "@/src/components/authForm/authForm";
import StepCounter from "@/src/components/stepsSensors/stepCounter";
import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const { user, signUp, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <View style={styles.conteiner}>
        <StepCounter user={user} />
      </View>
    );
  }

  return (
    <AuthForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSignUp={() => signUp(email, password)}
      onSignIn={() => signIn(email, password)}
    />
  );
}

const styles = StyleSheet.create({
    conteiner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background
    }
}) 

