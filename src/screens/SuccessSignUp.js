import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import success from '../../assets/success-account.png';

export default Success = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={success} style={styles.imgContainer}/>
            <Text style={styles.successText}>Registration completed successfully!</Text>
            <Text style={styles.successSubText}>Now you can read with us and share your opinions.</Text>

            <TouchableOpacity
                style={[styles.loginButtonContainer, styles.loginButton]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
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
      marginBottom: 8
    },
    successText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginRight: 20
    },
    successSubText: {
        marginTop: 10,
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20
    },
    loginButtonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
      }
})