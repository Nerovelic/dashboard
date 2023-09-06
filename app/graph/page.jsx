import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

// This code exports a React component function called `Graph` that receives properties such as
// `result`, `result2`, `PercentageOsea`, `PercentResidual`, and `MusclePercentage` for use in graphing body composition data.
export default function Graph({
  result,
  result2,
  PercentageOsea,
  PercentResidual,
  MusclePercentage,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (result !== null && result2 !== null) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Porcentaje Grasa",
            "Porcentaje Osea",
            "Porcentaje Residual",
            "Porcentaje Muscular",
          ],
          datasets: [
            {
              label: "Porcentaje",
              data: [result, PercentageOsea, PercentResidual, MusclePercentage],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [result, result2, PercentageOsea, PercentResidual, MusclePercentage]);

  return (
    <div>
      <h1 className="text-center text-white text-3xl mb-4">Gráfica</h1>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <canvas ref={chartRef} width="400" height="400"></canvas>
      </div>
    </div>
  );
}
