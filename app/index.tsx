import { useEffect } from "react";
import { Text, View } from "react-native";
import { supabase } from "../src/services/supabase";

export default function Home() {

  useEffect(() => {
    async function test() {
      console.log("🔍 Iniciando teste...");

      // 🔎 TESTE 1 - SELECT
      const { data: selectData, error: selectError } = await supabase
        .from("test")
        .select("*");

      console.log("SELECT DATA:", selectData);
      console.log("SELECT ERROR:", selectError);

      // 🧪 TESTE 2 - INSERT
      const { data: insertData, error: insertError } = await supabase
        .from("test")
        .insert([{ name: "Bruno" }]);

      console.log("INSERT DATA:", insertData);
      console.log("INSERT ERROR:", insertError);
    }

    test();
  }, []);

  return (
    <View>
      <Text>Testando Supabase...</Text>
    </View>
  );
}