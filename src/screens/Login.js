import { StyleSheet, Text, View, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import login from '../../assets/img-login.png';

export default function LoginScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '392214281743-fesdhqvkcisqsna2sds72htm4bur9u1f.apps.googleusercontent.com',
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user);
    })
      .catch((error) => {
        console.log(error);
      });
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image source={login} style={styles.imgContainer} />

          <GoogleSigninButton
            style={{ width: 300, height: 65, marginTop: 10 }}
            onPress={onGoogleButtonPress}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={login} style={styles.imgContainer} />
      <Text style={styles.text}>Welcome, {user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    width: 240,
    height: 214,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
