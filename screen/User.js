import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

function User() {
  const [licencia, setLicencia] = useState(null);

  // Función para traducir el estado
  const translateStatus = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
        return 'Pendiente';
      case 'expired':
        return 'Expirado';
      case 'accepted':
        return 'Aceptado';  // Traducción de "accepted"
      default:
        return status; // Si no se encuentra una traducción, se muestra el valor original
    }
  };
  const maskLicenseCode = (code) => {
    if (!code) return ''; // Devuelve una cadena vacía si code es null o undefined
    if (code.length >= 4) {
      // Reemplazar los últimos 4 caracteres con asteriscos
      return code.slice(0, -4) + '****';

    }
    return code; // Si el código tiene menos de 24 caracteres, se devuelve tal cual
  };
  

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
    await AsyncStorage.removeItem('@licencias');
    console.log('borrado');
  };

  //Verifica si hay datos de licencia para mostrar
  if (!licencia) {
    return (
      <>
      
        <View style={styles.withoutLicenseContainer}>
          <View >
            <Text style={styles.withoutLicense}>No posee Licencia...</Text>
          </View>
          <View style={styles.withoutLicenseImage}>
            <Image source={require("../assets/logonuevo.png")}
              style={{ width: 59, height: 59 }} />
          </View>
          <View>
            <Text style={styles.textImage}>Producto desarrollado por Desit SA</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
   
      <View style={styles.dataContainer}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Cuenta: </Text>
            <Text style={styles.textData}>{licencia.accountNumber}</Text>
            <View style={styles.underline}></View>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.text}>Licencia: </Text>
          <Text style={styles.textData}>{maskLicenseCode(licencia.code)}</Text> 
          <View style={styles.underline}></View>
        </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Equipo: </Text>
            <Text style={styles.textData}>{licencia.targetDeviceCode}</Text>
            <View style={styles.underline}></View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Estado </Text>
            <Text style={styles.textData}>
              {licencia.status ? translateStatus(licencia.status) : 'Desconocido'}
            </Text>
            <View style={styles.underline}></View>
          </View>
        </View>
      <View style={styles.container2}>
       
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
          </View>
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