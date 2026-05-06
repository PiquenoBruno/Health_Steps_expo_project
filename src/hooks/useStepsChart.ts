import { useAuth } from "@/src/hooks/useAuth";
import { getChartSteps } from "@/src/services/steps";

import { useEffect, useState } from "react";

export function useStepsChart() {
  const { user } = useAuth();

  const [data, setData] = useState<number[]>([]);

  const [labels, setLabels] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChart() {
      if (!user) return;

      setLoading(true);

      const today = new Date();

      const dates: string[] = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();

        d.setDate(today.getDate() - i);

        dates.push(
          d.toISOString().split("T")[0]
        );
      }

      const {
        data: stepsData,
        error,
      } = await getChartSteps(
        user.id,
        dates[0]
      );

      if (error) {
        console.log(error.message);

        setData([0, 0, 0, 0, 0, 0, 0]);

        setLabels(
          dates.map((date) =>
            new Date(date)
              .getDate()
              .toString()
          )
        );

        setLoading(false);

        return;
      }

      const stepsMap: Record<
        string,
        number
      > = {};

      stepsData?.forEach((item) => {
        stepsMap[item.date] = item.steps;
      });

      const formattedData = dates.map(
        (date) => stepsMap[date] || 0
      );

      const formattedLabels = dates.map(
        (date) =>
          new Date(date)
            .getDate()
            .toString()
      );

      setData(formattedData);

      setLabels(formattedLabels);

      setLoading(false);
    }

    loadChart();
  }, [user]);

  return {
    data,
    labels,
    loading,
  };
}
