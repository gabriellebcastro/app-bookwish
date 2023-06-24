import { StatusBar, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firebase } from './src/firebase/config.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SuccessSignUp from './src/screens/SuccessSignUp';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import Bookwish from './src/screens/Home';
import Profile from './src/screens/Profile';
import Library from './src/screens/Library';
import Feed from './src/screens/Feed';
import BookDetails from './src/screens/BookDetails.js';
import BookLibrary from './src/screens/BookLibrary.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BookwishTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Bookwish} options={{ headerShown: false, tabBarIcon: () => (
            <View style={{ marginBottom: -10 }}>
              <Icon name="home" color="#151E47" size={20}/>
            </View>
          )}}/>

      <Tab.Screen name="My Library" component={Library} options={{ headerShown: false, tabBarIcon: () => (
            <View style={{ marginBottom: -10 }}>
              <Icon name="bookmark" color="#151E47" size={20}/>
            </View>
          )}}/>

      <Tab.Screen name="My Reads" component={Feed} options={{ headerShown: false, tabBarIcon: () => (
            <View style={{ marginBottom: -10 }}>
              <Icon name="book-open" color="#151E47" size={20}/>
            </View>
          )}}/>

      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: () => (
            <View style={{ marginBottom: -10 }}>
              <Icon name="user" color="#151E47" size={20}/>
            </View>
          )}}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Success" component={SuccessSignUp} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="Bookwish" component={BookwishTab} />
          <Stack.Screen name="BookDetails" component={BookDetails} />
          <Stack.Screen name="BookLibrary" component={BookLibrary} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
