import { StatusBar, SafeAreaView, View } from 'react-native';
import Login from './src/telas/Login';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <Login />
    </SafeAreaView>
  );
}