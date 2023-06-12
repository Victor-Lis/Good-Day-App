import { View, Text, ImageBackground, StyleSheet, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import backgroundImage from '../../Images/background.png'

import heart from '../../Images/heart.png'
import hunger from '../../Images/hunger.png'
import grayHeart from '../../Images/grayHeart.png'
import grayHunger from '../../Images/grayHunger.png'

import pet from '../../Images/pet.gif'
import tombstone from '../../Images/tombstone.png'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Game() {

  const [hungerBoolean, setHungerBoolean] = useState(false)
  const [aliveBoolean, setAliveBoolean] = useState(true)

  async function getHunger(){

    let hunger = await AsyncStorage.getItem("@hunger")
    let alive = await AsyncStorage.getItem("@alive")

    if(hunger == "no"){

      setHungerBoolean(false)

    }else{

      setHungerBoolean(true)

    }

    if(alive == "no"){

      setAliveBoolean(false)

    }else{

      setAliveBoolean(true)

    }

  }

  async function handleFeed(){

    await AsyncStorage.setItem("@hunger", "no")
    await AsyncStorage.setItem("@alive", "yes")

    setHungerBoolean(false)

  }

  useEffect(() => {

    getHunger()

  })

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.content}>

        <View style={styles.infos}>
          
          <Image source={aliveBoolean? heart: grayHeart} style={{height: 70, width: 70}}/>
          <Image source={hungerBoolean? grayHunger: hunger} style={{height: 70, width: 70}}/>

        </View>

        <View style={styles.petArea}>

          {aliveBoolean? <Image source={pet} style={{height: 170, width: 170}} animationRepeatCount="indefinite"/>: <Image source={tombstone} style={{height: 170, width: 170}}/>}
          {hungerBoolean && aliveBoolean && <Button title="Alimentar" onPress={handleFeed} color={"orange"}/>}
          {!aliveBoolean && <Text style={{marginBottom: 20, fontWeight: "bold", fontSize: 20, color: "#fff"}}> Ele se foi... </Text>}

        </View>

      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({

  background: {

    flex: 1,
    alignItems: "center",
    justifyContent: "center"

  },
  content: {

    width: "90%",
    height: "95.5%",
    backgroundColor: "#00ADD3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    borderWidth: 1.5,
    borderColor: "#fff"

  },

  infos:{

    padding: "5.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flex: 1,
    marginTop: "2.5%"

  },

  petArea:{

    flex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingVertical: "1.5%"

  },

})