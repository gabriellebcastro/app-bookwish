import { StatusBar, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SuccessSignUp from './src/screens/SuccessSignUp';
import ForgotPasswordScreen from './src/screens/ForgotPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Success" component={SuccessSignUp} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
