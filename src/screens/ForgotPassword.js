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
import passwordImg from '../../assets/img-password.png';

export default function ForgotPasswordScreen ({ navigation }) {
  const [email, setEmail] = useState();

  return (
    <View style={styles.container}>
      <Image source={passwordImg} style={styles.imgContainer} />

      <Text style={styles.successText}>Forgot your password?</Text>

      <Text style={styles.successSubText}>Enter your registered email to reset your password.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail({ email })}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButtonContainer, styles.loginButton]}
        onPress={() => showAlert('Link to reset password sent to registered email.')}>
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Back to login</Text>
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
  successText: {
  fontSize: 20,
  fontWeight: "bold",
  marginLeft: 20,
  marginRight: 20
  },
  successSubText: {
  marginTop: 10,
  marginBottom: 15,
  fontSize: 16,
  marginLeft: 20,
  marginRight: 20
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

                      