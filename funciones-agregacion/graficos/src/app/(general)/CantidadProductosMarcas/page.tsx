"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getProductosPorMarca } from "@/app/servicios/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductosPorMarca {
  marca: string;
  cantidad_productos: number;
}

export default function Page() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Cantidad de productos",
        data: [] as number[],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos: ProductosPorMarca[] = await getProductosPorMarca();
        setChartData({
          labels: datos.map((item) => item.marca),
          datasets: [
            {
              label: "Cantidad de productos",
              data: datos.map((item) => Number(item.cantidad_productos)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Pie data={chartData} />
    </div>
  );
}
