import { createContext } from "react";
import { Producto } from "../modelos/Producto";

export interface ProductoContextType {
  productos: Producto[];
  obtenerProductos: () => Promise<void>;
  crearProducto: (producto: Omit<Producto, "idProducto">) => Promise<void>;
  eliminarProducto: (id: number) => Promise<void>;
}

export const ProductoContext = createContext<ProductoContextType>(
  {} as ProductoContextType,
);
