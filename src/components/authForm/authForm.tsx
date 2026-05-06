// src/components/AuthForm.tsx
import colors from "@/src/constants/colors";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSignUp: (email: string, password: string) => Promise<any>;
  onSignIn: (email: string, password: string) => Promise<any>;
};

export default function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
  onSignUp,
  onSignIn,
}: Props) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateFields() {
    let valid = true;

    if (!email.includes("@")) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Mínimo 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }

  async function handleSignIn() {
    const valid = validateFields();
    if (!valid) return;

    setLoading(true);

    const { error } = await onSignIn(email, password);

    setLoading(false);

    if (error) {
      setGeneralError("Email ou senha incorretos");
    } else {
      setGeneralError("");
    }
  }

  async function handleSignUp() {
    const valid = validateFields();
    if (!valid) return;

    setLoading(true);

    const { error } = await onSignUp(email, password);

    setLoading(false);

    if (error) {
      setGeneralError(error.message);
    } else {
      setGeneralError("");
    }
  }

  return (
    <View style={styles.container}>
      {generalError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>{generalError}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
          setGeneralError("");
        }}
        placeholder="Digite seu email"
        style={[
          styles.input,
          emailError ? styles.inputError : null,
        ]}
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError("");
          setGeneralError("");
        }}
        secureTextEntry
        placeholder="Digite sua senha"
        style={[
          styles.input,
          passwordError ? styles.inputError : null,
        ]}
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={loading ? "Carregando..." : "Cadastrar"}
            onPress={handleSignUp}
            color={colors.color1}
          />
        </View>

        <View style={styles.button}>
          <Button
            title={loading ? "Carregando..." : "Login"}
            onPress={handleSignIn}
            color={colors.colorDestaque}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  errorBox: {
    backgroundColor: colors.colorAlert,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  errorBoxText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.color2,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.color3,
    elevation: 2,
  },

  inputError: {
    borderColor: colors.colorAlert,
  },

  error: {
    color: colors.colorAlert,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },

  buttonContainer: {
    marginTop: 10,
  },

  button: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});