import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ProductoContext } from "../context/ProductoContext";
import { Producto } from "../modelos/Producto";

interface Props {
  verDetalle: (producto: Producto) => void;
  volverCrear: () => void;
}

export default function ListaProducto({ verDetalle, volverCrear }: Props) {
  const { productos, obtenerProductos } = useContext(ProductoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <TouchableOpacity style={styles.botonNuevo} onPress={volverCrear}>
        <Text style={styles.textoBotonNuevo}>Nuevo Producto</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 2 }]}>Nombre</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Precio</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Descripción</Text>
      </View>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.idProducto.toString()}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay productos registrados.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <Text style={[styles.celda, { flex: 2 }]} numberOfLines={1}>
              {item.nombre}
            </Text>
            <Text style={[styles.celda, { flex: 1 }]}>L. {item.precio}</Text>
            <View style={[styles.accion, { flex: 3 }]}>
              <TouchableOpacity
                style={styles.botonVer}
                onPress={() => verDetalle(item)}
              >
                <Text style={styles.textoBoton}>Ver</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#253FCE",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    minHeight: 55,
  },
  celda: {
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  accion: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  botonVer: {
    backgroundColor: "#21CE6E",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  BotonVer: {
    backgroundColor: "#21CE6E",
    padding: 6,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
  },
  botonNuevo: {
    backgroundColor: "#253FCE",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  textoBotonNuevo: {
    color: "#fff",
    fontWeight: "bold",
  },
  vacio: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
  },
});
