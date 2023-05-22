import { StatusBar, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SuccessSignUp from './src/screens/SuccessSignUp';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import Bookwish from './src/screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BookwishTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Bookwish} options={{ headerShown: false }}/>
      {/* Adicionar outras telas aqui */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: '#CFD7F8' } }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Success" component={SuccessSignUp} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="Bookwish" component={BookwishTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
