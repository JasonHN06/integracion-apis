import { View, Text, FlatList, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Asignatura } from '../modelos/Asignatura';

export default function AsignaturaComponent() {

  const [listaAsignaturas, setListaAsignaturas] = useState<Asignatura[]>([]);

  const [id,setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  const [cantidadhoras, setCantidadhoras] = useState<string>("");
  const [estado, setEstado] = useState<string>("");

  const [accion,setAccion] = useState<number>(0);


 async function obtenerAsignaturas() {

    const response = await fetch('http://localhost:5000/asignaturas');
    const data = await response.json();
    setListaAsignaturas(data.data);
  
  
  }


  async function guatdarAsignatura() {


    if(accion === 0){
      const response = await fetch('http://localhost:5000/asignaturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, cantidadhoras, estado }),
      });
    }
    else{
      const response = await fetch(`http://localhost:5000/asignaturas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, cantidadhoras, estado }),
      });
    }



    obtenerAsignaturas();
    
    
    setNombre('');
    setCantidadhoras('');
    setEstado('');

  }

  useEffect(() => {
    obtenerAsignaturas();
  }, []);


  function editarAsignatura(item:Asignatura) {

    setId(item.idAsignatura);
    setNombre(item.nombre);
    setCantidadhoras(item.cantidadhoras.toString());
    setEstado(item.estado.toString());
    setAccion(1);
    
  }

  async function eliminarAsignatura(id:number) {

    const response = await fetch(`http://localhost:5000/asignaturas/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    obtenerAsignaturas();

  }



  return (
    <View>
      <Text>Creacion de asignaturas</Text>


      <TextInput
      placeholder="Nombre"
      value={nombre}
      onChangeText={setNombre}
      />

      <TextInput
      placeholder="Cantidad de horas"
      value={cantidadhoras}
      onChangeText={setCantidadhoras}
      />


      <TextInput
      placeholder="Estado"
      value={estado}
      onChangeText={setEstado}
      />

      <Button
      title="Guardar asignatura"
      onPress={() => guatdarAsignatura()}
      />

      <FlatList
      data={listaAsignaturas}
      keyExtractor={(item) => item.idAsignatura.toString()}
      renderItem={({item}) => 
        <View>

          <Text>{item.idAsignatura} - {item.nombre} - {item.cantidadhoras} - {item.estado}</Text>

          <View>
            <Button
            title="Editar asignatura"
            onPress={() => editarAsignatura(item)}
            />
            <Button
            title="Eliminar asignatura"
            onPress={() => eliminarAsignatura(item.idAsignatura)}
            />
          </View>
        </View>
    

  
    
    }
      
      >

      </FlatList>
    </View>
  )
}