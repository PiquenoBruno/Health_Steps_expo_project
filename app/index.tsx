import AuthForm from "@/src/components/authForm/authForm";
import StepCounter from "@/src/components/stepsSensors/stepCounter";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../src/hooks/useAuth";

export default function Home() {
  const { user, signUp, signIn, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Bem-vindo!</Text>
        <Text>{user.email}</Text>
        <StepCounter user={user} />

        <Button title="Logout" onPress={logout} />
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