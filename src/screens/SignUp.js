import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import account from '../../assets/img-account.png';
import { auth } from '../../src/firebase/config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

export default SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //Atualizar o perfil do usuário com o nome
        updateProfile(auth.currentUser, { displayName: userName })
          .then(() => {
            console.log('Usuário criado com sucesso:', user);
            navigation.navigate('Success');
          })
          .catch((error) => {
            console.log('Erro ao atualizar o perfil do usuário:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Erro ao criar a conta', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={account} style={styles.imgContainer}/>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Name"
          underlineColorAndroid="transparent"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Confirm your password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButtonContainer, styles.loginButton]}
        onPress={handleSignUp}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  imgContainer: {
    width: 300,
    height: 300,
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

                      