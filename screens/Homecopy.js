
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, ActivityIndicator, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';


// const [modalVisible, setModalVisible] = useState(false);
 
//  const Item = ({ modalVisible }) => (
//   <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>ShowAZ Modal</Text>
//       </Pressable>
//     </View>
// );

//  const renderItem = ({ item }) => (
//     <Item title={item.data.title} />
//   );

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export  function HomeScreen({route, navigation}) {
 
  const [isLoading, setLoading] = useState(true);
  const [isAbo, setAbo] = useState(true);
  const [postsData, setPostsData ] = useState({});
  const [abosData, setAbosData ] = useState({});
  const [hotData, setHotData ] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
 const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  useEffect(() => {
 

const storage = async()=>{
      let items = await AsyncStorage.getItem("token");
      console.log('jojo '+items)

      var requestOptions = {
    method: 'GET',
    headers: {
      "Authorization": 'Bearer ' + items,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },

    redirect: 'follow'
  };
  var ABOS;
  var POST;
  
 fetch('https://oauth.reddit.com/subreddits/mine/subscriber', requestOptions)
    .then((response) => response.json())
    .then((json) => {
      //console.log("ABONNEMENTS " + JSON.stringify(json))
      ABOS = json.data.children;
      //console.log(ABOS);
      setPostsData(ABOS);


      const listItems = ABOS.map((element) => { 
       const title = element.data.title;
       const ups = element.data.ups;
      // console.log('c les abo '+JSON.stringify(title))
      
              
                
                  fetch(`https://www.reddit.com/r/${title}.json`)
                  .then((response) => response.json())
                  .then((json) => {
                      
                    POST = json.data.children;

                    const mappp = POST.map((lepost) => { 
                      const titlepost = lepost.data.title;
                       console.log('c les title des post '+JSON.stringify(titlepost))
                    //console.log("je ssuis l'abo :  " + JSON.stringify(json.data.children.data.ups))
              
                  })
                    
                  })
                  .catch((error) => {
                    console.error(error);
                    })
            .finally (() => setAbo(false));

         

      });

    })
    .catch((error) => {
      console.error(error);
    }) .finally (() => setLoading(false));




     fetch('https://www.reddit.com/r/programming/hot.json') 
    .then((response) => response.json())
    .then((json) => {
      // console.log("HOOOOOT " + JSON.stringify(json))
     //ABOS = json.data.children;
      setHotData(json.data.children);
      //setPostsName(POSTS.display_name);
      //console.log("name " + POSTS.kind);
      //console.log("description " + POSTS.data.children.data.id);
      
    })
    .catch((error) => {
      console.error(error);
    })

    }
    storage()

  }, [])
  ;

  // BARRE DE RECHERCHE
      const [search, setSearch] = useState("");

      function updateSearch (search) {
        setSearch;
      };

    //const {toktok} = navigation.getParam('token', 'tokstring');
  return (
   
// <View style={{ flex: 1, paddingTop: 60 }}>
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Chauds</Text>
//             <FlatList
//           data={hotData}
//           keyExtractor={( item ) => item.data.id}
//           //keyExtractor={( item , index) => item.data.id}
//           renderItem={({ item }) => (
//             <Text>{item.data.title}</Text>
//           )}
//         />
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
    <View style={{ flex: 1, paddingTop: 60 }}>
{/* BOUTON DE FILTRE + SEARCH BAR */}

      <SearchBar inputStyle={{backgroundColor: 'black'}}
    containerStyle={{backgroundColor: 'white', borderColor: '#EAD017', borderWidth: 1, borderRadius: 5}}
    placeholderTextColor={'white'}
       placeholder="Type Here..." onChangeText={updateSearch(search)} value={search}/>
     <View style={styles.row}>
      <TouchableOpacity style = {{"borderColor":"#EAD017","borderRadius":10,"backgroundColor": "white","alignItems":"center","justifyContent": "center","width": 90,"height": 40,}} onPress={() => {;}}>
        <Text style = {{"color":"black", }}>NOUVEAU </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{"borderColor":"#EAD017","borderRadius":10,"backgroundColor": "white","alignItems":"center","justifyContent": "center","width": 90,"height": 40,}} onPress={() => {;}}>
        <Text style = {{"color":"black", }}>POPULAIRE </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{"borderColor":"#EAD017","borderRadius":10,"backgroundColor": "white","alignItems":"center","justifyContent": "center","width": 90,"height": 40,}} onPress={() => {;}}>
        <Text style = {{"color":"black", }}>CHAUD </Text>
      </TouchableOpacity>
</View>
<Text>LES POSTS DE MES ABONNEMENTS</Text>
{/* <Text>{titlepost}</Text> */}
{isAbo ? <ActivityIndicator/> : (
        <FlatList
          data={abosData}
          keyExtractor={( item ) => item.data.id}
          //keyExtractor={( item , index) => item.data.id}
          renderItem={({ item }) => (
            <Text>heheheh</Text>
          )}
        />
      )}
</View>  
  );
  
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-between",
    margin:10,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

