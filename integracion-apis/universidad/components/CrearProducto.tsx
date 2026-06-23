import {
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ProductoContext } from "../context/ProductoContext";
import { Picker } from "@react-native-picker/picker";

interface Props {
  verLista: () => void;
}

export default function CrearProducto({ verLista }: Props) {
  const { crearProducto } = useContext(ProductoContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState<"Disponible" | "No disponible">(
    "Disponible",
  );
  const [categoria, setCategoria] = useState("Tecnología");
  const [imagen, setImagen] = useState("");

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso", "Debe permitir el acceso a la cámara");
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const guardarProducto = async () => {
    if (!nombre || !descripcion || !precio || !categoria || !imagen) {
      Alert.alert("Error", "Complete todos los campos");
      return;
    }
    await crearProducto({
      nombre,
      descripcion,
      precio: Number(precio),
      estado,
      categoria,
      url_fotografia: imagen,
    });
    Alert.alert("Éxito", "Producto creado correctamente");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setEstado("Disponible");
    setCategoria("Tecnología");
    setImagen("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nuevo Producto</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) =>
            setEstado(itemValue as "Disponible" | "No disponible")
          }
        >
          <Picker.Item label="Disponible" value="Disponible" />
          <Picker.Item label="No disponible" value="No disponible" />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item label="Tecnología" value="Tecnología" />
          <Picker.Item label="Audio" value="Audio" />
          <Picker.Item label="Computadoras" value="Computadoras" />
          <Picker.Item label="Accesorios" value="Accesorios" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>
      <TextInput
        placeholder="Precio"
        keyboardType="numeric"
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
      />
      <TouchableOpacity style={styles.imagen} onPress={tomarFoto}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.foto} />
        ) : (
          <Text>Tomar Fotografía</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={guardarProducto}>
        <Text style={styles.botonGuardar}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={verLista}
      >
        <Text style={styles.botonDetalles}>Ver Detalle Items</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  imagen: {
    width: 170,
    height: 170,
    borderWidth: 1,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  foto: {
    width: "100%",
    height: "100%",
  },
  botonGuardar: {
    backgroundColor: "#253FCE",
    padding: 6,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
  },
  botonDetalles: {
    marginTop: 12,
    backgroundColor: "#21CE6E",
    padding: 6,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
  },
});
