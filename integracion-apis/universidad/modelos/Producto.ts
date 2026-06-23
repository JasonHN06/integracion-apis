export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: "Disponible" | "No disponible";
  categoria: string;
  url_fotografia: string;
}
