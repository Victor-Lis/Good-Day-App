import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, set, push } from 'firebase/database';
import { getStorage, ref as storageref, uploadBytes, getDownloadURL } from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-0W161qdocqapeaaOJRaHLdbO_-ktqI8",
  authDomain: "goodday-b5d6e.firebaseapp.com",
  databaseURL: "https://goodday-b5d6e-default-rtdb.firebaseio.com",
  projectId: "goodday-b5d6e",
  storageBucket: "goodday-b5d6e.appspot.com",
  messagingSenderId: "518362151560",
  appId: "1:518362151560:web:07e9d28cd1b6d16613bd3d",
  measurementId: "G-YDBQDTV9ZR"
};

const app = initializeApp(firebaseConfig);

// Obtenção da instância do Realtime Database
const database = getDatabase(app);

// Função para acessar o App, através do login
async function login(email, password, setLoading, setUser){

    setLoading(true)

    let userId
    const auth = getAuth();
    let newEmail = email.toLowerCase()
    newEmail = newEmail.replace(" ", "")

    let userCredential;
    await signInWithEmailAndPassword(auth, newEmail, password).then((user) => userCredential = user).catch(response => alert(response));

    // Obter o ID do usuário logado
    if(userCredential){
      userId = userCredential.user.uid;

      await AsyncStorage.setItem('@useruid', userId)
      await AsyncStorage.setItem("@hunger", `no`)
      await AsyncStorage.setItem("@alive", `yes`)
      
      setUser(userId)
    }

  setLoading(false)

}

async function cadastro(email, password, setLoading, setUser){

  setLoading(true)

  let userId
  const auth = getAuth();
  let newEmail = email.toLowerCase()
  newEmail = newEmail.replace(" ", "")

  let userCredential;
  await createUserWithEmailAndPassword(auth, newEmail, password).then(async (user) => {
    
    userCredential = user

    const userRef = ref(database, `cadastros/${user.user.uid}`);
    await set(userRef, {
      email: (newEmail == ''? email.toLowerCase() : newEmail.toLowerCase()),
      senha: password,
    })

  }).catch(response => alert(response));

  // Obter o ID do usuário logado
  if(userCredential){
    userId = userCredential.user.uid;

    await AsyncStorage.setItem('@useruid', userId)
    setUser(userId)
  }

setLoading(false)

}


// Função para setImagem no banco, e passa-lá para o objeto "Produto" 
async function setImage(uri, setProduto){

  const storage = getStorage(app);
  const ext = uri.substring(uri.lastIndexOf("."))
  let currentDate = new Date()
  let imageName = currentDate.valueOf()
  const storageRef = storageref(storage, `images/${imageName}${ext}`)
  const metadata = {
    contentType: `${ext}`,
  };

  const res = await fetch(uri)
  const blob = await res.blob()
  await uploadBytes(storageRef, blob, metadata).then(async (snapshot) => {

    getDownloadURL(storageRef)
      .then((url) => {
        setProduto((prevProduct) => ({ ...prevProduct, imagem: `${url}` }))
      })
      .catch((error) => console.log('Erro ao obter URL da imagem:', error));

  });

}


// Função que recebe as informções do banco
async function getDatas(setLoading, setProdutos){

  setLoading(true)
  const database = getDatabase(app);
  const productsRef = ref(database, `produtos/`);
  setProdutos([])
  
  await get(productsRef).then((snapshot, index) => {
    
    if(snapshot.exists()){
      setProdutos(Object.values(snapshot.val()))
    }

  })
  setLoading(false)

}


// Função que da um "push" no banco e adiciona um novo produto no final da "lista"
async function handleAdd(setLoading, setProdutos, produto, handleClose, setProduto){
  setLoading(true)
  const database = getDatabase(app);
  const productsRef = ref(database, 'produtos/');
  
  console.log(produto.nome +""+ produto.preco +""+ produto.imagem)
  if(produto.nome != "" && produto.preco != "" && produto.imagem != "" && produto.ingredientes != "" && produto.descricao != ""){
    // Atualizar o banco de dados com o novo array de produtos

    await push(productsRef, produto)
      
  }else{

    alert("Preencha os dados corretamente!")

  }
  // Obter os dados atualizados do banco de dados
  getDatas(setLoading, setProdutos);
  handleClose()
  setProduto({

    nome: "",
    preco: "",
    tipo: "L",
    imagem: ""

  })
  setLoading(false)
}

// Função que "edita" o lanche no banco de dados
async function handleEdit(setLoading, setProdutos, handleClose, produtos, index, datas, setProduto){
  setLoading(true)
  const database = getDatabase(app);
  const productsRef = ref(database, 'produtos/');

  // Atualizar o banco de dados com o novo array de produtos
  setProdutos(produtos.splice(index, 1, datas))

  await set(productsRef, produtos)
  // Obter os dados atualizados do banco de dados
  getDatas(setLoading, setProdutos);
  setProduto({
    
    nome: "",
    preco: "",
    tipo: "L",
    imagem: ""
    
  })
  setLoading(false)
  handleClose()
}

// Função que exclui um item da lista, trabalhando como se fosse um array
async function handleDelete(setLoading, setProdutos, produtos, index){
  setLoading(true)
  const database = getDatabase(app);
  const productsRef = ref(database, 'produtos/');

  // Atualizar o banco de dados com o novo array de produtos
  setProdutos(produtos.splice(index, 1))

  await set(productsRef, produtos)
  // Obter os dados atualizados do banco de dados
  getDatas(setLoading, setProdutos);
  setLoading(false)
}


// Função que recebe dados do usuário
async function getUserDatas(setLoading, userUid, setDatas){

  setLoading(true)
  const database = getDatabase(app);
  const userRef = ref(database, `cadastros/${userUid}`);
  setDatas()

  await get(userRef).then((snapshot, index) => {
    
    if(snapshot.exists()){
      setDatas(snapshot.val())
      console.log(snapshot.val())
    }

  })
  setLoading(false)

}

export { database, login, getDatas, handleAdd, handleDelete, setImage, handleEdit, getUserDatas, cadastro };