import AuthForm from "@/src/components/authForm/authForm";
import StepCounter from "@/src/components/stepsSensors/stepCounter";
import { useAuth } from "@/src/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { user, signUp, signIn, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  USUÁRIO LOGADO
  if (user) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          Bem-vindo!
        </Text>

        <Text style={{ marginBottom: 20 }}>
          {user.email}
        </Text>

        {/* CONTADOR DE PASSOS */}
        <StepCounter user={user} />

        {/* IR PARA HISTÓRICO */}
        <Link href={"/history" as const}>
          <Text style={{ marginTop: 20, color: "blue" }}>
            Ver histórico
          </Text>
        </Link>

        {/* LOGOUT */}
        <View style={{ marginTop: 20 }}>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>
    );
  }

  //  USUÁRIO NÃO LOGADO
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