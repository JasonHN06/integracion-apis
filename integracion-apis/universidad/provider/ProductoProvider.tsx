import { useEffect, useState } from "react";
import { ProductoContext } from "../context/ProductoContext";
import { Producto } from "../modelos/Producto";

const API = "http://192.168.1.8:5000";

interface Props {
  children: React.ReactNode;
}

export const ProductoProvider = ({ children }: Props) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const obtenerProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`);
      const data = await response.json();
      setProductos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearProducto = async (producto: Omit<Producto, "idProducto">) => {
    try {
      await fetch(`${API}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      await obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await fetch(`${API}/items/${id}`, {
        method: "DELETE",
      });
      await obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        obtenerProductos,
        crearProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
