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

export default SignUp = ({}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setPassword2] = useState();

  showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId)

  return (
    <View style={styles.container}>
      <Image source={account} style={styles.imgContainer}/>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Name"
          underlineColorAndroid="transparent"
          onChangeText={userName => setUserName({ userName })}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail({ email })}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword({ password })}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Confirm your password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={confirmPassword => setPassword2({ confirmPassword })}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButtonContainer, styles.loginButton]}
        onPress={() => showAlert('account created :)')}>
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

                      