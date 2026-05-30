import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 space-y-2 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-semibold text-white">Graficos con ChartJS</h1>
      <Link
        href="/TotalProductos"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Total Productos
      </Link>
      <Link
        href="/ValorTotalProductos"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Valor Total de Productos
      </Link>
      <Link
        href="/ValorTotalProductosPorTipo"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Valor Total de Productos por Tipo
      </Link>
    </div>
  );
}
