import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {NavigationContainer} from '@react-navigation/native';

// Componentes
import LoginScreen from './src/Components/Login';
import BottomTabRoute from './src/Routes/BottomTabRoute';

// LocalStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [user, setUser] = useState(null)

  const messages = [
    {
      autor: "Les Brown",
      mensagem: "Acredite em si mesmo e todo o resto se encaixará.",
    },
    {
      autor: "Vidal Sassoon",
      mensagem: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    },
    {
      autor: "Mahatma Gandhi",
      mensagem: "Seja a mudança que você deseja ver no mundo.",
    },
    {
      autor: "Confúcio",
      mensagem: "O homem que move montanhas começa carregando pequenas pedras.",
    },
    {
      autor: "Walt Disney",
      mensagem: "Acredite, coragem é algo que todos têm. Você só precisa se arriscar.",
    },
    {
      autor: "Nelson Mandela",
      mensagem: "A maior glória em viver não está em nunca cair, mas em nos levantarmos cada vez que caímos.",
    },
    {
      autor: "Albert Einstein",
      mensagem: "A imaginação é mais importante que o conhecimento.",
    },
    {
      autor: "Maya Angelou",
      mensagem: "Você é a única pessoa que pode usar sua habilidade. É uma obrigação.",
    },
    {
      autor: "Steve Jobs",
      mensagem: "O único jeito de fazer um ótimo trabalho é amar o que você faz.",
    },
    {
      autor: "Oprah Winfrey",
      mensagem: "Você se torna o que acredita. Acredite em si mesmo.",
    },
    {
      autor: "Winston Churchill",
      mensagem: "O sucesso é ir de fracasso em fracasso sem perder entusiasmo.",
    },
    {
      autor: "Eleanor Roosevelt",
      mensagem: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    },
    {
      autor: "Thomas Edison",
      mensagem: "Não falhei. Apenas descobri 10.000 maneiras que não funcionam.",
    },
    {
      autor: "Ralph Waldo Emerson",
      mensagem: "O que nos angustia não são as coisas em si, mas a nossa opinião sobre elas.",
    },
    {
      autor: "Napoleon Hill",
      mensagem: "Não espere. O momento nunca será perfeito. Comece onde você está.",
    },
    {
      autor: "Henry Ford",
      mensagem: "Se você pensa que pode ou pensa que não pode, de qualquer forma você está certo.",
    },
    {
      autor: "Confúcio",
      mensagem: "Aquele que quer mover o mundo deve primeiro mover a si mesmo.",
    },
    {
      autor: "John Lennon",
      mensagem: "Tudo o que você precisa é amor.",
    },
    {
      autor: "Bruce Lee",
      mensagem: "Se você sempre coloca limites em tudo o que faz, físico ou qualquer outra coisa, ele se espalhará para o seu trabalho e para a sua vida. Não há limites. Há apenas alturas maiores para alcançar.",
    },
    {
      autor: "Coco Chanel",
      mensagem: "A beleza começa no momento em que você decide ser você mesma.",
    },
    {
      autor: "Walt Disney",
      mensagem: "Acredite, coragem é algo que todos têm. Você só precisa se arriscar.",
    },
    {
      autor: "Buda",
      mensagem: "O caminho para a paz interior começa com um sorriso.",
    },
    {
      autor: "Steve Jobs",
      mensagem: "A inovação distingue um líder de um seguidor.",
    },
    {
      autor: "Maya Angelou",
      mensagem: "Você sempre será você, e é isso que é incrível.",
    },
    {
      autor: "Nelson Mandela",
      mensagem: "Não há nada como voltar para um lugar que está igual para descobrir o quanto a gente mudou.",
    },
    {
      autor: "Albert Einstein",
      mensagem: "O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação.",
    },
    {
      autor: "Oprah Winfrey",
      mensagem: "A maior aventura que você pode fazer é viver a vida dos seus sonhos.",
    },
    {
      autor: "Winston Churchill",
      mensagem: "Sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    },
    {
      autor: "Eleanor Roosevelt",
      mensagem: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    },
    {
      autor: "Thomas Edison",
      mensagem: "Oportunidade está perdida quando vestida de trabalho.",
    },
    {
      autor: "Ralph Waldo Emerson",
      mensagem: "Acredite em si mesmo, nada é mais prático ou mais necessário.",
    },
    {
      autor: "Napoleon Hill",
      mensagem: "A vida é uma série de oportunidades disfarçadas de desafios.",
    },
    {
      autor: "Henry Ford",
      mensagem: "O fracasso é simplesmente a oportunidade de começar de novo, desta vez de forma mais inteligente.",
    },
    {
      autor: "Confúcio",
      mensagem: "Aquele que move montanhas começa carregando pequenas pedras.",
    },
    {
      autor: "John Lennon",
      mensagem: "A vida é aquilo que acontece enquanto você está ocupado fazendo outros planos.",
    },
    {
      autor: "Bruce Lee",
      mensagem: "Um objetivo não é sempre destinado a ser alcançado, ele serve simplesmente como algo para se mirar.",
    },
    {
      autor: "Coco Chanel",
      mensagem: "A moda passa, o estilo permanece.",
    },
    {
      autor: "Walt Disney",
      mensagem: "Não basta fazer coisas boas, é preciso fazê-las bem.",
    },
    {
      autor: "Buda",
      mensagem: "A felicidade não depende do que você tem ou de quem você é. Ela só depende do que você pensa.",
    },
    {
      autor: "Steve Jobs",
      mensagem: "Seu tempo é limitado, então não o desperdice vivendo a vida de outra pessoa.",
    },
    {
      autor: "Maya Angelou",
      mensagem: "Você é você. Isso é o que torna você especial, o que torna você incrível.",
    },
    {
      autor: "Nelson Mandela",
      mensagem: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    },
    {
      autor: "Albert Einstein",
      mensagem: "A lógica pode levar você de A a B, mas a imaginação pode levar você a qualquer lugar.",
    },
    {
      autor: "Oprah Winfrey",
      mensagem: "Você é responsável pela sua vida. Você não pode esperar que outras pessoas façam isso por você.",
    },
    {
      autor: "Winston Churchill",
      mensagem: "O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.",
    },
    {
      autor: "Eleanor Roosevelt",
      mensagem: "Faça o que você sente no seu coração que está certo - pois você será criticado de qualquer maneira.",
    },
    {
      autor: "Thomas Edison",
      mensagem: "Nosso maior fracasso está em desistir. A maneira mais certa de ter sucesso é sempre tentar mais uma vez.",
    },
    {
      autor: "Ralph Waldo Emerson",
      mensagem: "A confiança em si mesmo é o primeiro segredo do sucesso.",
    },
    {
      autor: "Napoleon Hill",
      mensagem: "Todas as adversidades que você enfrenta na vida são apenas desafios temporários. Não desista.",
    },
    {
      autor: "Henry Ford",
      mensagem: "O fracasso é a oportunidade de começar de novo, de forma mais inteligente.",
    },
    {
      autor: "Confúcio",
      mensagem: "Aquele que planeja uma tarefa antes de iniciá-la tem três vezes mais chances de sucesso.",
    },
    {
      autor: "John Lennon",
      mensagem: "Tudo o que você precisa é amor.",
    },
    {
      autor: "Bruce Lee",
      mensagem: "Se você sempre coloca limites em tudo o que faz, físico ou qualquer outra coisa, ele se espalhará para o seu trabalho e para a sua vida. Não há limites. Há apenas alturas maiores para alcançar.",
    },
    {
      autor: "Coco Chanel",
      mensagem: "A beleza começa no momento em que você decide ser você mesma.",
    },
    {
      autor: "Walt Disney",
      mensagem: "Acredite, coragem é algo que todos têm. Você só precisa se arriscar.",
    },
    {
      autor: "Buda",
      mensagem: "O caminho para a paz interior começa com um sorriso.",
    },
    {
      autor: "Steve Jobs",
      mensagem: "A inovação distingue um líder de um seguidor.",
    },
    {
      autor: "Maya Angelou",
      mensagem: "Você sempre será você, e é isso que é incrível.",
    },
    {
      autor: "Nelson Mandela",
      mensagem: "Não há nada como voltar para um lugar que está igual para descobrir o quanto a gente mudou.",
    },
    {
      autor: "Albert Einstein",
      mensagem: "O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação.",
    },
    {
      autor: "Oprah Winfrey",
      mensagem: "A maior aventura que você pode fazer é viver a vida dos seus sonhos.",
    },
    {
      autor: "Winston Churchill",
      mensagem: "Sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    },
    {
      autor: "Eleanor Roosevelt",
      mensagem: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    },
    {
      autor: "Thomas Edison",
      mensagem: "Oportunidade está perdida quando vestida de trabalho.",
    },
    {
      autor: "Ralph Waldo Emerson",
      mensagem: "Acredite em si mesmo, nada é mais prático ou mais necessário.",
    },
    {
      autor: "Napoleon Hill",
      mensagem: "A vida é uma série de oportunidades disfarçadas de desafios.",
    },
    {
      autor: "Henry Ford",
      mensagem: "O fracasso é simplesmente a oportunidade de começar de novo, desta vez de forma mais inteligente.",
    },
    {
      autor: "Confúcio",
      mensagem: "Aquele que move montanhas começa carregando pequenas pedras.",
    },
    {
      autor: "John Lennon",
      mensagem: "A vida é aquilo que acontece enquanto você está ocupado fazendo outros planos.",
    },
    {
      autor: "Bruce Lee",
      mensagem: "Um objetivo não é sempre destinado a ser alcançado, ele serve simplesmente como algo para se mirar.",
    },
    {
      autor: "Coco Chanel",
      mensagem: "A moda passa, o estilo permanece.",
    },
    {
      autor: "Walt Disney",
      mensagem: "Não basta fazer coisas boas, é preciso fazê-las bem.",
    },
    {
      autor: "Buda",
      mensagem: "A felicidade não depende do que você tem ou de quem você é. Ela só depende do que você pensa.",
    },
    {
      autor: "Steve Jobs",
      mensagem: "Seu tempo é limitado, então não o desperdice vivendo a vida de outra pessoa.",
    },
    {
      autor: "Maya Angelou",
      mensagem: "Você é você. Isso é o que torna você especial, o que torna você incrível.",
    },
    {
      autor: "Nelson Mandela",
      mensagem: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    },
    {
      autor: "Albert Einstein",
      mensagem: "A lógica pode levar você de A a B, mas a imaginação pode levar você a qualquer lugar.",
    },
    {
      autor: "Oprah Winfrey",
      mensagem: "Você é responsável pela sua vida. Você não pode esperar que outras pessoas façam isso por você.",
    },
    {
      autor: "Winston Churchill",
      mensagem: "O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.",
    },
    {
      autor: "Eleanor Roosevelt",
      mensagem: "Faça o que você sente no seu coração que está certo - pois você será criticado de qualquer maneira.",
    },
    {
      autor: "Thomas Edison",
      mensagem: "Nosso maior fracasso está em desistir. A maneira mais certa de ter sucesso é sempre tentar mais uma vez.",
    },
    {
      autor: "Ralph Waldo Emerson",
      mensagem: "A confiança em si mesmo é o primeiro segredo do sucesso.",
    },
    {
      autor: "Napoleon Hill",
      mensagem: "Todas as adversidades que você enfrenta na vida são apenas desafios temporários. Não desista.",
    },
    {
      autor: "Henry Ford",
      mensagem: "O fracasso é a oportunidade de começar de novo, de forma mais inteligente.",
    },
    {
      autor: "Confúcio",
      mensagem: "Aquele que planeja uma tarefa antes de iniciá-la tem três vezes mais chances de sucesso.",
    },
    // Continue adicionando mais frases motivacionais aqui...
  ];

  async function getUserUid(){

    let userid = await AsyncStorage.getItem('@useruid')

    let lastDate = await AsyncStorage.getItem("@lastDate") || "Primeira vez"

    if(lastDate == "Primeira vez"){

      let date = new Date()
      await AsyncStorage.setItem("@lastDate", `${Number(date.getDate()+1) < 10? "0"+Number(date.getDate()+1): Number(date.getDate()+1)}/${Number(date.getMonth()+1)+1 < 10? "0"+Number(date.getMonth()+1): Number(date.getMonth()+1)}/${date.getFullYear()}`)
      await AsyncStorage.setItem("@hunger", `no`)
      await AsyncStorage.setItem("@alive", `yes`)
      const randomIndex = Math.floor(Math.random() * messages.length);
      const message = messages[randomIndex];
      
      const messageJSON = JSON.stringify(message)
      await AsyncStorage.setItem("@message", messageJSON)

    }else{

      let date = new Date()
      if(lastDate != `${Number(date.getDate()+1) < 10? "0"+Number(date.getDate()+1): Number(date.getDate()+1)}/${Number(date.getMonth()+1)+1 < 10? "0"+Number(date.getMonth()+1): Number(date.getMonth()+1)}/${date.getFullYear()}`){

        let messageJSONActual = await AsyncStorage.getItem("@message")
        let messageActual = JSON.parse(messageJSONActual)
        
        let randomIndex = Math.floor(Math.random() * messages.length);
        let message = messages[randomIndex];

        while(message == messageActual.menssagem){

          randomIndex = Math.floor(Math.random() * messages.length);
          message = messages[randomIndex];

        }

        let hunger = await AsyncStorage.getItem("@hunger")
        let track = true;

        const messageJSON = JSON.stringify(message)

        await AsyncStorage.setItem("@message", messageJSON)
        await AsyncStorage.setItem("@lastDate", `${Number(date.getDate()+1) < 10? "0"+Number(date.getDate()+1): Number(date.getDate()+1)}/${Number(date.getMonth()+1)+1 < 10? "0"+Number(date.getMonth()+1): Number(date.getMonth()+1)}/${date.getFullYear()}`)
      
        if(((date.getDate()+1 - Number(lastDate[0]+lastDate[1])) < 2) && ((date.getMonth()+1) == Number(lastDate[3]+lastDate[4])) && ((date.getFullYear()) == Number(lastDate[6]+lastDate[7]+lastDate[8]+lastDate[9]))){

          if(hunger == "no"){

            await AsyncStorage.setItem("@hunger", `yes`)
            track = false

          }else if(hunger == "yes" && track == true){

            await AsyncStorage.setItem("@hunger", `yes`)
            await AsyncStorage.setItem("@alive", `no`)

          }

        }else{

          await AsyncStorage.setItem("@hunger", `yes`)
          await AsyncStorage.setItem("@alive", `no`)

        }

      }

    }

    if(userid){

      setUser(userid)

    }

  }

  useEffect(() => {

    getUserUid()

  }, [])

  if(!user){
    return (
      <>

        <StatusBar hidden={true}/>
        <LoginScreen setUser={setUser}/>
      
      </>
    );
  }else{
    return (
      <>
        <StatusBar hidden={true}/>
        <NavigationContainer>
        
          <BottomTabRoute userUid={user} setUser={setUser}/>

        </NavigationContainer>
      </>
    );
  }
}