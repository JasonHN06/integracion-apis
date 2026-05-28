import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Maestro } from "../modelos/Maestro";

export default function MaestroComponent() {
  const [listaMaestros, setListaMaestros] = useState<Maestro[]>([]);
  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [accion, setAccion] = useState<number>(0);

  async function obtenerMaestros() {
    const response = await fetch("http://localhost:5000/maestros");
    const data = await response.json();
    setListaMaestros(data.data);
  }

  async function guardarMaestro() {
    if (accion === 0) {
      const response = await fetch("http://localhost:5000/maestros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, edad }),
      });
    } else {
      const response = await fetch(`http://localhost:5000/maestros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, edad }),
      });
    }
    obtenerMaestros();
    setNombre("");
    setEmail("");
    setEdad("");
  }

  useEffect(() => {
    obtenerMaestros();
  }, []);

  function editarMaestro(item: Maestro) {
    setId(item.idMaestro);
    setNombre(item.nombre);
    setEmail(item.email);
    setEdad(item.edad.toString());
    setAccion(1);
  }

  async function eliminarMaestro(id: number) {
    const response = await fetch(`http://localhost:5000/maestros/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    obtenerMaestros();
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Creacion de maestros</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
      />
      <Button title="Guardar maestro" onPress={() => guardarMaestro()} />
      <FlatList
        data={listaMaestros}
        keyExtractor={(item) => item.idMaestro.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.idMaestro} - {item.nombre} - {item.email} - {item.edad}
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="Editar maestro"
                  onPress={() => editarMaestro(item)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Eliminar maestro"
                  onPress={() => eliminarMaestro(item.idMaestro)}
                />
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
