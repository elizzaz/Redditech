
import { StyleSheet } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "./Utils";
import {HomeScreen, logo_small} from "./Index";



WebBrowser.maybeCompleteAuthSession();

// export function SignInScreen() {
//   const { signIn } = React.useContext(AuthContext);

//   return (
//     <View>
//       <Button title="Sign in" onPress={() => signIn()} />
//     </View>
//   );
// }

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  };



  export function SignInScreen({navigation}) {
    const [request, response, signIn] = useAuthRequest(
      {
        clientId: 'vYYiZjEL19AQHLarnjREXw',
        //elisaId: vYYiZjEL19AQHLarnjREXw
        scopes: ['*'],
        redirectUri: makeRedirectUri({
          // For usage in bare and standalone
          native: 'exp://10.136.78.255:19000r',
          //elisaurlexpo: exp://10.136.78.68:19000
        }),
      },
      discovery
    );


    function access_token() {  
      const tokenEndPoint = "https://www.reddit.com/api/v1/access_token"
    }
    React.useEffect(() => {
      if (response?.type === 'success') {
         const {code}  = response.params;
         console.log("le code est " + code);
  var details = {
    'grant_type': 'authorization_code',
    'code': code,
    "redirect_uri": "exp://10.136.78.255:19000"
  };


  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": "Basic dllZaVpqRUwxOUFRSExhcm5qUkVYdzo=",
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody,
    redirect: 'follow'
  };
  fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
    .then(response => response.text())
    .then(
        async (result) => {
            
                try {                    
                console.log(JSON.parse(result))
                const jsonValue = JSON.parse(result)
                const tokstring = jsonValue.access_token

                console.log("le token : "+jsonValue.access_token)

                await AsyncStorage.setItem('token', jsonValue.access_token)
                

                const letok = await AsyncStorage.getItem('token')
               
            
                console.log("token stocké : "+letok)
                navigation.navigate('HomeScreen',{ params: letok})
              } 
              catch (e) {
                console.log("error stockage token"+ error)
              }
              
              } 
               
    )
    .catch(error => console.log('error', error));
  }
    }, [response]);
  

  return (
    <View style={styles.container}>
    <Image 
    style={styles.user}
         source={require('./user.png')}
       />
    <Text style={styles.title}>WELCOME !</Text>
    <Text>Hey bienvenue sur l'application Redditech</Text>
    <Text>Amuse toi bien !</Text>

<TouchableOpacity style = {{
        "marginTop":100,
        "borderRadius":10,
        "backgroundColor": "black",
        "alignItems":"center",
        "justifyContent": "center",
        "width": 220,
        "height": 50,
      }}
      onPress={() => {signIn();}}>
        <Text style = {{
          "color":"white",
        }}>Connect with Reddit</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD017',
    alignItems: 'center',
    justifyContent: 'center',
  },
    user: {
        width: 180,
        height: 180,
        marginTop: -150,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    
  },
  button: {
    marginTop: -150,
  backgroundColor: "#000000",
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
});