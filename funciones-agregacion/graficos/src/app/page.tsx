import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 space-y-2 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-semibold text-white">
        Graficos con ChartJS
      </h1>
      <Link
        href="/PromedioProductosCategorias"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Promedio Productos por Categoría
      </Link>
      <Link
        href="/CantidadProductosMarcas"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Cantidad Productos por Marca
      </Link>
    </div>
  );
}
