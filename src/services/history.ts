import { supabase } from "./supabase";

export async function getHistory(userId: string) {
  const { data, error } = await supabase
    .from("steps")
    .select("date, steps")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.log("Erro ao buscar histórico:", error.message);
    return [];
  }

  return data;
}
