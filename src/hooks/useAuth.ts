// src/hooks/useAuth.ts
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log("ERRO CADASTRO:", error.message);
    } else {
      console.log("Usuário cadastrado!");
    }
  }

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      console.log("Preencha email e senha");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("ERRO LOGIN:", error.message);
    } else {
      console.log("Login realizado!");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, signUp, signIn, logout };
}
