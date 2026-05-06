import { supabase } from "./supabase";

// SALVAR PASSOS
export async function saveSteps(
  userId: string,
  steps: number
) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { data } = await supabase
    .from("steps")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (data) {
    await supabase
      .from("steps")
      .update({ steps })
      .eq("id", data.id);
  } else {
    await supabase
      .from("steps")
      .insert({
        user_id: userId,
        date: today,
        steps,
      });
  }
}

// HISTÓRICO
export async function getHistory(
  userId: string
) {
  return await supabase
    .from("steps")
    .select("date, steps")
    .eq("user_id", userId)
    .order("date", {
      ascending: false,
    });
}

// GRÁFICO
export async function getChartSteps(
  userId: string,
  startDate: string
) {
  return await supabase
    .from("steps")
    .select("date, steps")
    .eq("user_id", userId)
    .gte("date", startDate);
}

// PASSOS DE HOJE
export async function getTodaySteps(
  userId: string
) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return await supabase
    .from("steps")
    .select("steps")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();
}