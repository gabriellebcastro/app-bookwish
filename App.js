import { StatusBar, SafeAreaView, View } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton, Image } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import LoginScreen from './src/screens/Login';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <LoginScreen />
    </SafeAreaView>
  )
}
