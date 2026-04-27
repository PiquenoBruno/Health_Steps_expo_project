// src/components/AuthForm.tsx
import { Button, Text, TextInput, View } from "react-native";

export default function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
  onSignUp,
  onSignIn,
}: any) {
  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Cadastrar" onPress={onSignUp} />
      <Button title="Login" onPress={onSignIn} />
    </View>
  );
}
