"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getPromedioProductosCategoria } from "@/app/servicios/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PromedioProductosCategoria {
  categoria: string;
  valor_promedio: number;
}

export default function Page() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Valor Promedio",
        data: [] as number[],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos: PromedioProductosCategoria[] =
          await getPromedioProductosCategoria();
        setChartData({
          labels: datos.map((item) => item.categoria),
          datasets: [
            {
              label: "Valor Promedio por Categoría",
              data: datos.map((item) => Number(item.valor_promedio)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Line data={chartData} />
    </div>
  );
}
