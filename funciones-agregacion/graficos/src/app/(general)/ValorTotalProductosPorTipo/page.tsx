"use client";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { getValorPromedioProductosPorCategoria } from "@/app/servicios/api";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface ValorTotalProductosPorTipo {
  categoryCode: string;
  promedio: number;
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
    getValorPromedioProductosPorCategoria().then((response) => {
      const datos: ValorTotalProductosPorTipo[] = response.data;
      setChartData({
        labels: datos.map((item) => item.categoryCode),
        datasets: [
          {
            label: "Valor Total Productos Por Tipo",
            data: datos.map((item) => Number(item.promedio)),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(255,255,255)",
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <PolarArea data={chartData} />
    </div>
  );
}
