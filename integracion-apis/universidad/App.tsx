import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ProductoProvider } from "./provider/ProductoProvider";
import CrearProducto from "./components/CrearProducto";
export default function App() {
  return (
    <ProductoProvider>
      <CrearProducto />
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
