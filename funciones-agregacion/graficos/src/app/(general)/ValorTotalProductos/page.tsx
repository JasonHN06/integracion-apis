"use client";
import { getValorTotalProductosPorTipo } from "@/app/servicios/api";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ValorTotalPorTipo {
  productType: string;
  valor_total: number;
}

export default function Page() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Valor Total Productos",
        data: [] as number[],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getValorTotalProductosPorTipo().then((response) => {
      const datos: ValorTotalPorTipo[] = response.data;
      setChartData({
        labels: datos.map((item) => item.productType),
        datasets: [
          {
            label: "Valor total",
            data: datos.map((item) => Number(item.valor_total)),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}
