import { supabase } from "./supabase";

export async function saveSteps(userId: string, steps: number) {
  const today = new Date().toISOString().split("T")[0];

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
    await supabase.from("steps").insert({
      user_id: userId,
      date: today,
      steps,
    });
  }
}