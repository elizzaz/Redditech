import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Separator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function ProfilScreen({route, navigation}) {

  const [subData, setSubData ] = useState({});
  
  const [userData, setUserData] = useState({
  name: "",
  description: "",
  banner_img: "",
  friends: "",
  karma: "",
  subreddit: {
    public_description : "",
    icon_img : ""

  }
});
 

  var PROFIL;
  const Item = ({ user }) => (
<View>
  <Text style={styles.title}>{user}</Text>
</View>
);
const renderItem = ({ PROFIL}) => <Item user={PROFIL.title} />;
const [isLoading, setLoading] = useState(true);
const [postsData, setPostsData ] = useState({});

useEffect(() => {
       
  const storage = async()=>{ 
   let items = await AsyncStorage.getItem("token");
    console.log("profile : " + items)
    var requestOptions = {
  method: 'GET',
  headers: {
    "Authorization": 'Bearer ' + items,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },

  redirect: 'follow'
};


fetch("https://oauth.reddit.com/api/v1/me", requestOptions)
 .then((response) => response.json())
.then((json) => {
   // console.log(JSON.stringify(json));
    PROFIL = json;
    setUserData(PROFIL);
    // setUserName(json.name);
    // setUserDescription(json.subreddit.public_description);
    // setUserBanner_img(json.subreddit.banner_img);
    // setUserFriends(json.num_friends);
    // setUserKarma(json.total_karma);
    console.log("name " + PROFIL.name);
    console.log("description " + PROFIL.subreddit.public_description);
    console.log("icon_img " + PROFIL.subreddit.icon_img);
    console.log("friends " + PROFIL.num_friends);
    console.log("karma " + PROFIL.total_karma);
  })
 
.catch(error => console.log('error', error));


  fetch('https://oauth.reddit.com/subreddits/mine/subscriber', requestOptions)
  .then((response) => response.json())
  .then((json) => {
    // console.log("ABONNEMENTS " + JSON.stringify(json))
   
    setPostsData(json.data.children);
    //setPostsName(POSTS.display_name);
    //console.log("name " + POSTS.kind);
    //console.log("description " + POSTS.data.children.data.id);
    
  })
  .catch((error) => {
    console.error(error);
  }) .finally (() => setLoading(false));

 fetch('https://www.reddit.com/r/programming/about.json') 
  .then((response) => response.json())
  .then((json) => {

    setSubData(json.data);

    
  })
  .catch((error) => {
    console.error(error);
  })

  }

  storage()
   
}, []);
    return (
      
      <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              
                {/* <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}/> */}
                <Image 
                style={styles.avatar}
                source={{uri: userData.icon_img}}
                />
                <Text style={styles.name}></Text>
            </View>
          </View>
          <View style={styles.profileDetail}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.count}>{userData.name}</Text>
              
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.count}>{userData.num_friends}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Karma</Text>
              <Text style={styles.count}>{userData.total_karma}</Text>
            </View>
          </View>
          
          <View style={styles.body}>
          <Text style={styles.count}>{userData.subreddit.public_description}</Text>
        </View>

        <View style={styles.abo}>
          <Text style={styles.textsub}>Mes Subbreddits</Text>
          <Text>{subData.subscribers} : Nmbr subscribers pour programming </Text>
           {isLoading ? <ActivityIndicator/> : (
             <ScrollView>
      <FlatList
        data={postsData}
        keyExtractor={( item ) => item.data.id}
        //keyExtractor={( item , index) => item.data.id}
        renderItem={({ item }) => (
          <Text style={styles.abon}>{item.data.title}</Text>
        )}
      />
      </ScrollView>
    )}
        </View>
</View>
    );
  }
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#EAD017",
    paddingTop: 30,
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  abo: {
    marginTop: 40
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    padding:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#EAD017",
    margin: 10,
  },
  body:{
    paddingTop: 90,
    margin: 10,
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00CED1",
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
  textsub: {
    fontSize: 24,
    marginBottom: 30,
    margin:10,
  },
  abon:{
    marginTop: 30,
    marginRight: 100,
    marginLeft: 100,
    textAlign: 'center',
    backgroundColor: "#EAD017",
    borderRadius: 63,
    padding: 5,

  }
});