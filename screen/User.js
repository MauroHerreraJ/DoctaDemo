import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

function User() {
  const [licencia, setLicencia] = useState(null);

  // Función para recuperar la licencia almacenada
  const loadLicencia = async () => {
    try {
      const storedLicencia = await AsyncStorage.getItem('@licencias');
      if (storedLicencia) {

        const parsedData = JSON.parse(storedLicencia);

        setLicencia(parsedData.result.licenseCreated); // Accedemos a "licenseCreated"
        console.log(parsedData.result.licenseCreated);
      }
    } catch (error) {
      console.log("Error al cargar la licencia", error);
    }
  };

  // Ejecuta la función cada vez que la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      loadLicencia();
    }, [])
  );

  // Ejecuta la función cuando se monta el componente
  useEffect(() => {
    loadLicencia();
  }, []);

  const Borrar = async () => {
    await AsyncStorage.removeItem('código');
    console.log('borrado');
  };

  //Verifica si hay datos de licencia para mostrar
 

  return (
    <>
   
     
       
      <View style={styles.imageContainer}>
        <Image source={require("../assets/logonuevo.png")}
          style={{ width: 59, height: 59 }} />
      </View>
      <TouchableOpacity style={styles.buttonUpdate} onPress={Borrar}>
          <Text>Borrar</Text>
        </TouchableOpacity>
      <View>
        <Text style={styles.textImage}>Producto desarrollado por Desit SA</Text>
      </View>
          
    
    </>
  );
}

export default User;

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  textContainer: {
    marginTop: 3,
    marginBottom: 15,
    fontSize: 36,
  },
  text: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  textData: {
    fontSize: 17,
    fontFamily: "open-sans",
  },
  underline: {
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
    marginTop: 1,
    opacity: 0.55
  },
  textImage: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15
  },
  imageContainer: {
    marginTop:550,
    alignItems: "center",
    marginBottom: 20
  },
  withoutLicense: {
    marginTop: 150,
    fontFamily: "open-sans",
    fontSize: 19
  },
  withoutLicenseImage: {
    marginTop: 480
  },
  withoutLicenseContainer: {
    alignItems: "center"
  }, 
  container2:{
    marginTop:255,
  }
});