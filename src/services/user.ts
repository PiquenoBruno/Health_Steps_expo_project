// src/services/user.ts
import { supabase } from "./supabase";

//  buscar meta do usuário
export async function getUserGoal(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("goal_steps")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("ERRO AO BUSCAR META:", error.message);
    return 10000; // fallback
  }

  return data.goal_steps;
}

//  atualizar meta
export async function updateUserGoal(userId: string, goal: number) {
  const { error } = await supabase
    .from("profiles")
    .update({ goal_steps: goal })
    .eq("id", userId);

  if (error) {
    console.log("ERRO AO ATUALIZAR META:", error.message);
  }

  return { error };
}