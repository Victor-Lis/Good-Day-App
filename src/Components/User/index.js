import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import backgroundImage from '../../Images/background.png'

import { getUserDatas } from '../../Connections/firebaseConfig'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User({route}) {

  const { userUid } = route.params;
  const { setUser } = route.params;

  const [datas, setDatas] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSignOut(){

    await AsyncStorage.removeItem('@useruid')
    setUser()

  }

  useEffect(() => {

    getUserDatas(setLoading, userUid, setDatas)

  }, [])

  return (
    <ImageBackground style={styles.container} source={backgroundImage}>
      <View style={styles.contentContainer}> 

        <View style={styles.infos}>
          
          {datas && 

            <View style={styles.row}>
              <Text style={styles.rowTitle}>Email:</Text>
              <Text>{datas.email}</Text>
            </View>

          }
          {datas && 

            <View style={styles.row}>
              <Text style={styles.rowTitle}>Senha:</Text>
              <Text>{datas.senha}</Text>
            </View>

          }

        </View>

          <Button title='Sair' color={"red"} onPress={handleSignOut}/>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
  
      width: "92.5%",
      height: "92%",
      backgroundColor: "rgba(255,255,255,0.9)",
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: "10%",
  
    },
    infos:{

      width: "92.5%",
      height: "92%",
      // backgroundColor: "rgba(0,0,0,0.05)",
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: "10%"

    },
    row:{

      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: "5%",
      width: "95%",
      marginTop: "5%",
      padding: "2.5%",
      backgroundColor: "rgba(0,0,0,0.05)",
      borderRadius: 10,

    },
    rowTitle: {

      fontWeight: "bold",
      marginRight: "5%",
      fontSize: 17,

    }
  });