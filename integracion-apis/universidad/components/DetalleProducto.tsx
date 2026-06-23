import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Producto } from "../modelos/Producto";
import { ProductoContext } from "../context/ProductoContext";

interface Props {
  producto: Producto;
  regresar: () => void;
}

export default function DetalleProducto({ producto, regresar }: Props) {
  const { eliminarProducto } = useContext(ProductoContext);

  const eliminar = () => {
    Alert.alert("Eliminar producto", "¿Desea eliminar este producto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await eliminarProducto(producto.idProducto);
          Alert.alert("Éxito", "Producto eliminado correctamente");
          regresar();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalle del Producto</Text>
      <Image source={{ uri: producto.url_fotografia }} style={styles.imagen} />
      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.valor}>{producto.nombre}</Text>
      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.valor}>{producto.descripcion}</Text>
      <Text style={styles.label}>Precio</Text>
      <Text style={styles.valor}>L. {producto.precio}</Text>
      <Text style={styles.label}>Estado</Text>
      <Text style={styles.valor}>{producto.estado}</Text>
      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.valor}>{producto.categoria}</Text>
      <TouchableOpacity style={styles.botonEliminar} onPress={eliminar}>
        <Text style={styles.textoBoton}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonVolver} onPress={regresar}>
        <Text style={styles.textoBoton}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imagen: {
    width: 220,
    height: 220,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: "#555",
  },
  botonEliminar: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  botonVolver: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
