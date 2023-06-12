import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';

// Conexão com o banco
import {login, cadastro} from '../../Connections/firebaseConfig'

// Aplicação visual
import logoImage from '../../Images/background.png'
import backgroundImage from '../../Images/background.png'
import icon from '../../Images/icon.png'
import Feather from 'react-native-vector-icons/Feather'

const LoginScreen = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('cadastro')

  const handleLogin = async () => {

    if(email != '' && password != ''){

      if(type == "login"){

        login(email, password, setLoading, setUser)

      }else{

        cadastro(email, password, setLoading, setUser)

      }

    }else{

      alert("Preencha os dados corretamente!")

    }

  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Image source={icon} style={styles.logo} />

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}> {type == "login"? "Login": "Cadastro"} </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View style={styles.passwordContainer}>

            <TextInput
              style={[styles.input, {width: "79%", marginRight: "1%"}]}
              placeholder={showPassword? "•••••": "Senha"}
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <View style={[styles.passwordButton, {width: "20%"}]}>
              {showPassword ? <Feather style={[]} name='eye' size={25} color={'orange'} onPress={() => setShowPassword(!showPassword)}/> : <Feather style={[]} name='eye-off' size={25} color={"rgba(50,50,50, 0.6)"} onPress={() => setShowPassword(!showPassword)}/>}
            </View>

          </View>
          <TouchableOpacity style={!loading? type == "login"? [styles.button] : [styles.button, {backgroundColor: "blue"}]: [styles.button, {backgroundColor: "gray"}]} onPress={handleLogin} disabled={loading}>
            <Text style={!loading? type == "login"? [styles.buttonText] : [styles.buttonText, {color: "#fff"}]: [styles.buttonText, {color: "lightgray"}]}> {loading? "Carregando...": type == "login"? "Entrar": "Cadastrar"} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.change} onPress={() => 

            {type == "login"? setType("cadastro"): setType("login")}

          }>

            <Text style={{textAlign: "center", color: "#fff"}}> {type == "login"? "Cadastro": "Login"} </Text>

          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: "rgba(66, 44, 14, .75)"
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '75%',
    borderWidth: 1.5,
    borderColor: '#000'
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  passwordContainer: {

    width: '100%',
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,

  },
  passwordButton:{

    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",

  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  change:{

    backgroundColor: "red",
    marginHorizontal: "30%",
    borderRadius: 10,
    padding: "2%",
    marginTop: '02.5%',

  }
});

export default LoginScreen;
