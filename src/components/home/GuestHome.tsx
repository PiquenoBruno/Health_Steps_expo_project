import AuthForm from "@/src/components/authForm/authForm";
import { useAuth } from "@/src/hooks/useAuth";
import { useState } from "react";

export default function GuestHome() {
  const { signUp, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
