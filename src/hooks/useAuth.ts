// src/hooks/useAuth.ts
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  //  CADASTRO
  async function signUp(email: string, password: string) {
    if (!email || !password) {
      return { error: { message: "Preencha email e senha" } };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("ERRO CADASTRO:", error.message);
    } else {
      console.log("Usuário cadastrado!");
    }

    return { error };
  }

  // 🔑 LOGIN
  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return { error: { message: "Preencha email e senha" } };
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

    return { error };
  }

  //  LOGOUT
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  //  SESSÃO
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

  return {
    user,
    signUp,
    signIn,
    logout,
  };
}