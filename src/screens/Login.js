import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import login from '../../assets/img-login.png';
import { auth } from '../../src/firebase/config.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        navigation.navigate('Bookwish');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Erro ao fazer login', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={login} style={styles.imgContainer} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButtonContainer, styles.loginButton]}
        onPress={() => navigation.navigate('Bookwish')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.buttonText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  imgContainer: {
    width: 240,
    height: 214,
    marginBottom: 10
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#CFD7F8',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 16
  },
  loginButtonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#151E47',
  },
  loginText: {
    color: 'white',
    fontSize: 16
  },
  buttonContainer: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: 250,
  },
  buttonText: {
    fontSize: 14
  }
})

                      