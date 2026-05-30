"use client";
import { getTotalProductos } from "@/app/servicios/api";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Total Productos",
        data: [] as number[],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getTotalProductos()
    .then((data) => {
      const totalProducto = data.data.total_productos;
      setChartData({
        labels: ["Actual", "Faltante"],
        datasets: [
          {
            label: "Total Productos",
            data: [totalProducto, 2000  - totalProducto],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
}
