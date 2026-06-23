import { StyleSheet, Text, View } from "react-native";
import { ProductoProvider } from "./provider/ProductoProvider";
import CrearProducto from "./components/CrearProducto";
import { useState } from "react";
import { Producto } from "./modelos/Producto";
import DetalleProducto from "./components/DetalleProducto";
import ListaProducto from "./components/ListaProducto";
export default function App() {
  const [pantalla, setPantalla] = useState<"crear" | "lista" | "detalle">(
    "crear",
  );

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  return (
    <ProductoProvider>
      {pantalla === "crear" && (
        <CrearProducto verLista={() => setPantalla("lista")} />
      )}
      {pantalla === "lista" && (
        <ListaProducto
          volverCrear={() => setPantalla("crear")}
          verDetalle={(producto) => {
            setProductoSeleccionado(producto);
            setPantalla("detalle");
          }}
        />
      )}
      {pantalla === "detalle" && productoSeleccionado && (
        <DetalleProducto
          producto={productoSeleccionado}
          regresar={() => setPantalla("lista")}
        />
      )}
    </ProductoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});
