import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { color } from 'react-native-elements/dist/helpers';

export function SettingScreen(navigation) {


  const [booleanData, setBooleanData] = useState({
    enable_followers: false,
    show_presence: false,
    over_18: false,
    hide_robots: false,
    show_twitter: false,
    public_votes: false

  });


  useEffect(() => {

    updatedata();

    console.log("success")

  }, [booleanData]
  )

  async function updatedata() {
    let items = await AsyncStorage.getItem("token");


    var requestOptions = {
      method: 'PATCH',
      headers: {
        "Authorization": 'Bearer ' + items,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(booleanData),

    };
    fetch('https://oauth.reddit.com/api/v1/me/prefs', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // JSON.stringify(setValeur(json.enable_followers));
        console.log("retour du patch ", json.enable_followers)
        console.log("retour du patch ", json.show_presence)
        console.log("retour du patch ", json.over_18)
        console.log("retour du patch ", json.hide_from_robots)
        console.log("retour du patch ", json.show_twitter)
        console.log("retour du patch ", json.public_votes)

      })
      .catch((error) => {
        console.error(error);
      })

  };

  useEffect(() => {
    const storage = async () => {
      let items = await AsyncStorage.getItem("token");
      // console.log('setting'+items)

      var requestOptions1 = {
        method: 'GET',
        headers: {
          "Authorization": 'Bearer ' + items,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        redirect: 'follow'
      };

      fetch('https://oauth.reddit.com/api/v1/me/prefs', requestOptions1)
        .then((response) => response.json())
        .then((json) => {

          setBooleanData({
            enable_followers: json.enable_followers,
            show_presence: json.show_presence,
            over_18: json.over_18,
            hide_robots: json.hide_from_robots,
            show_twitter: json.show_twitter,
            public_votes: json.public_votes
          })

          console.log("enable followers: " + JSON.stringify((json.enable_followers)))
          console.log("show presence: " + JSON.stringify(json.show_presence))
          console.log("over 18 : " + JSON.stringify(json.over_18))
          console.log("hide from robots: " + JSON.stringify(json.hide_from_robots))
          console.log("show twitter: " + JSON.stringify(json.show_twitter))
          console.log("public votes: " + JSON.stringify(json.public_votes))
        })
        .catch((error) => {
          console.error(error);
        })


      //.finally (() => setLoading(false));

    }
    storage()

  }, [])
    ;
  return (

    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}></Text>
          <Text style={{"color":"white", "fontSize": 24}}>Changer mes paramètres</Text>
          {/* <Text> Param 1 {setting.num_comments} </Text> */}
          <Text style={styles.count}></Text>
        </View>
      </View>
        {/* SWITCH */}
 {/* SETTING  Enable followers */}
        <View style={styles.switch}>
        <Text>Autoriser les abonnements</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.enable_followers ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, enable_followers: !booleanData.enable_followers })}
            value={booleanData.enable_followers}
          />
         </View>
 {/* SETTING  Show présence */}
         <View style={styles.switch}>
           <Text>Afficher mon statut de connexion</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.show_presence ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, show_presence: !booleanData.show_presence })}
            value={booleanData.show_presence}
          />
        </View>
 {/* SETTING  Over 18 */}
        <View style={styles.switch}>
           <Text>Afficher le contenu interdit au moins de 18 ans</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.over_18 ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, over_18: !booleanData.over_18 })}
            value={booleanData.over_18}
          />
        </View>
 {/* SETTING  Hide from robots */}
        <View style={styles.switch}>
           <Text>Etre caché des robots</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.hide_from_robots ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, hide_from_robots: !booleanData.hide_from_robots })}
            value={booleanData.hide_from_robots}
          />
        </View>
 {/* SETTING  show twitter */}
        <View style={styles.switch}>
           <Text>Afficher mon twiter</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.show_twitter ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, show_twitter: !booleanData.show_twitter })}
            value={booleanData.show_twitter}
          />
        </View>
 {/* SETTING  public votes */}
        <View style={styles.switch}>
           <Text>ACtiver les votes</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffffff" }}
            thumbColor={booleanData.public_votes ? "#EAD017" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setBooleanData({ ...booleanData, public_votes: !booleanData.public_votes })}
            value={booleanData.public_votes}
          />
        </View>
        

      </View>
    
  );
}
const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,

  },
  header: {
    backgroundColor: "#EAD017",
    paddingTop: 30,
    marginBottom: 50
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  abo: {
    marginTop: 40
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent: {
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "#EAD017",
    margin: 10,
  },
  body: {
    paddingTop: 90,
    margin: 10,
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
  description: {
    fontSize: 20,
    color: "#00CED1",
    marginTop: 10,
    textAlign: 'center'
  },
  textsub: {
    fontSize: 24,
    marginBottom: 30,
    margin: 10,
  },
  abon: {
    marginTop: 30,
    marginRight: 100,
    marginLeft: 100,
    textAlign: 'center',
    backgroundColor: "#EAD017",
    borderRadius: 63,
    padding: 5,

  }
});