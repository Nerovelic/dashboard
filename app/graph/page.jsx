import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Graph({
  result,
  result2,
  PercentageOsea,
  PercentResidual,
  MusclePercentage,
}) {
  const chartRef = useRef(0);
  // To keep a reference to the current chart
  const chartInstance = useRef(0);
  const [tableContainerSize, setTableContainerSize] = useState({
    width: "auto", // Default width
    height: "auto", // Default high
  });

  useEffect(() => {
    if (result !== null && result2 !== null) {
      const ctx = chartRef.current.getContext("2d");
      // Destroys the previous graphic if it exist
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
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

      // Assigns the width and height of the table container to the chart container
      chartRef.current.parentNode.style.width = `${tableContainerSize.width}px`;
      chartRef.current.parentNode.style.height = `${tableContainerSize.height}px`;
    }
  }, [result, result2, PercentageOsea, PercentResidual, MusclePercentage]);

  // Gets the size of the table container and updates the status
  useEffect(() => {
    const tableContainer = document.getElementById("table-container");
    if (tableContainer) {
      setTableContainerSize({
        width: "auto",
        height: "auto",
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-center text-white text-3xl mb-4">Gráfica</h1>
      <div
        id="table-container"
        className="border border-gray-300 rounded-md overflow-hidden"
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
