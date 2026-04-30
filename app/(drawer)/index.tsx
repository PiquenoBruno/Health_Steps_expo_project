import AuthForm from "@/src/components/authForm/authForm";
import StepCounter from "@/src/components/stepsSensors/stepCounter";
import { useAuth } from "@/src/hooks/useAuth";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const { user, signUp, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <View style={{ padding: 20 }}>
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