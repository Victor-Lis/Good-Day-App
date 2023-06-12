import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import backgroundImage from '../../Images/background.png'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {

  const [message, setMessage] = useState(null)

  const [day, setDay] = useState(null)

  async function getMessage(){

    const messageJSON = await AsyncStorage.getItem("@message")
    const message = JSON.parse(messageJSON)

    setMessage(message)

  }

  async function getDay(){

    let dia = new Date().getDay()

    if(dia == 0){

      setDay("Domingo")

    }else if(dia == 1){

      setDay("Segunda-Feira")

    }else if(dia == 2){

      setDay("Terça-Feira")

    }else if(dia == 3){

      setDay("Quarta-Feira")

    }else if(dia == 4){

      setDay("Quinta-Feira")

    }else if(dia == 5){

      setDay("Sexta-Feira")

    }else if(dia == 6){

      setDay("Sábado")

    }
  }

  useEffect(() => {

    getMessage()
    getDay()

  }, [])

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.dayBox}>

        <Text style={styles.dayText}> {day && day} </Text>

      </View>
      <View style={styles.contentBox}>

        {message && <Text style={styles.message}><Text style={{color: "#422c0e"}}>"</Text>{message.mensagem}<Text style={{color: "#422c0e"}}>"</Text></Text>}
        {message && <Text style={styles.author}> {message.autor}<Text style={{color: "#422c0e"}}>.</Text> </Text>}

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  background: {

    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"

  },

  dayBox: {

    width: "95%",
    paddingHorizontal: "2.5%",
    height: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    elevation: 5,

  },

  dayText: {

    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,.9)",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: "2.5%",
    paddingHorizontal: "5%",

  },

  contentBox: {

    height: "50%",    
    width: "100%",
    paddingHorizontal: "2.5%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "10%",

  },

  message: {

    fontSize: 15.5,
    width: "100%",

  },

  author: {
    
    fontSize: 18, 
    color: "#000", 
    width: "95%", 
    textAlign: "right", 
    marginTop: "10%",
    fontWeight: "bold"

  },

})