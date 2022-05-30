
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, ActivityIndicator, FlatList,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

export  function HomeScreen({route, navigation}) {

    // BARRE DE RECHERCHE
    const [search, setSearch] = useState("");

    function updateSearch (search) {
      setSearch;
    };



  const [postData, setPostData] = useState([]);


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

      // je recup les subreddits auquel je suis abonnée
      fetch('https://oauth.reddit.com/subreddits/mine/subscriber', requestOptions)
      .then((response) => response.json())
      .then((json) => {
       const ABOS = json.data.children;
      //  console.log('abos : ', ABOS)
     
       // const listItems = ABOS.map((element) => { 
        //  const title = element.data.title;               
                  // je recup les post de mes subreddits du coup 
                    fetch(`https://www.reddit.com/r/programming.json`)
                    .then((response) => response.json())
                    .then((json) => {
                        // console.log('le json ',json.data.children)
                        if(json){
                     const POST =  json.data.children;
  
                      // const mappp = POST.map((lepost) => { 
                       // const map = lepost.data;
                        const newarray = [];
                        POST.forEach(element => newarray.push({
                          title: element.title,
                          author_fullname: element.author_fullname,
                          //description: element.all_awardings.description,
                          selftext: element.selftext,
                          
                        })
                          
                        );
                      setPostData(
                        newarray
                      )
                      console.log('title du forEach: '+setPostData.title)
                        // })
                      }
                   })
                   
                   .catch(error => console.log('error', error));
              // })
      })
    }
  storage()
  }, [])
  ;
    

  return (
    <View>
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
    </View>
    <View>
{postData.length > 0 && postData.map((element, i)=>
{
 
   return <View style={styles.content}>
     <Text>dhdhdh</Text>
   <Text>title : {element.title}</Text>
   <Text>autor : {element.author_fullname}</Text>
   {/* <Text>description : {element.description}</Text> */}
   <Text>selftext : {element.selftext}</Text>
   </View>
   }
   )}
   
    </View>
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
  content: {
    paddingTop:150,
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
    textAlign: "center",
  },
});

