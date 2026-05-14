import Filter from "@/src/components/history/filter/filter";
import Header from "@/src/components/history/header/header";
import HistoryList from "@/src/components/history/historyList/historyList";
import SummaryCard from "@/src/components/history/summaryCard/summaryCard";
import StepsChart from "@/src/components/stepsChart/stepsChart";
import colors from "@/src/constants/colors";
import { useHistory } from "@/src/hooks/useHistory";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";


export default function History() {
  const { user, history, loading } = useHistory();

  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.colorDestaque} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedText}>Você precisa estar logado</Text>
      </View>
    );
  }

  const totalSteps = history.reduce((acc, item) => acc + item.steps, 0);
  const avgSteps = Math.round(totalSteps / history.length);

  const sortedHistory = history.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredHistory = sortedHistory.filter((item) => {
    if (!startDate || !endDate) return true;
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const applyQuickFilter = (days: number) => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - days);
    setStartDate(past);
    setEndDate(today);
    setVisibleCount(10);
  };

  const applyCurrentMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(firstDay);
    setEndDate(today);
    setVisibleCount(10);
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setVisibleCount(10);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

      <Header />

      <View style={styles.chartContainer}>
        <StepsChart />
      </View>

      <SummaryCard totalSteps={totalSteps} avgSteps={avgSteps} />

      <Filter
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        clearFilter={clearFilter}
        applyQuickFilter={applyQuickFilter}
        applyCurrentMonth={applyCurrentMonth}
      />

      {/* LISTA DE HISTÓRICO */}
      <HistoryList
        filteredHistory={filteredHistory}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: colors.background },
  chartContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.color1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  notLoggedText: { textAlign: "center", marginTop: 50, fontWeight: "bold", color: colors.colorAlert },
});
