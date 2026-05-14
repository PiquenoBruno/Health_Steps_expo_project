import colors from "@/src/constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  clearFilter: () => void;
  applyQuickFilter: (days: number) => void;
  applyCurrentMonth: () => void;
}

export default function Filter({
  setStartDate,
  setEndDate,
  clearFilter,
  applyQuickFilter,
  applyCurrentMonth,
}: Props) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [startDate, setLocalStartDate] = useState<Date | null>(null);
  const [endDate, setLocalEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString("pt-BR") : "Selecionar";

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Filtrar período</Text>

      {/* DATA RANGE */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.label}>Início</Text>
          <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.label}>Fim</Text>
          <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

      {/* PICKERS */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) {
              setLocalStartDate(date);
              setStartDate(date);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) {
              setLocalEndDate(date);
              setEndDate(date);
            }
          }}
        />
      )}

      {/* QUICK FILTERS */}
      <View style={styles.quickFilterRow}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => applyQuickFilter(7)}
        >
          <Text style={styles.quickText}>7 dias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => applyQuickFilter(30)}
        >
          <Text style={styles.quickText}>30 dias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={applyCurrentMonth}
        >
          <Text style={styles.quickText}>Mês</Text>
        </TouchableOpacity>
      </View>

      {/* CLEAR */}
      <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
        <Text style={styles.clearText}>Limpar filtro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 20,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.color1,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  dateButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },

  label: {
    fontSize: 11,
    color: "#888",
    marginBottom: 3,
  },

  dateText: {
    textAlign: "center",
    color: colors.color3,
    fontWeight: "600",
  },

  quickFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  quickButton: {
    flex: 1,
    backgroundColor: colors.color2,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },

  quickText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  clearButton: {
    backgroundColor: colors.colorAlert,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  clearText: {
    color: "#fff",
    fontWeight: "600",
  },
});