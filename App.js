import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import CommentScreen from "./src/screens/Comment";
import Like from './src/screens/Like'
import HomeMenu from "./src/navigation/HomeMenu";
import Register from "./src/screens/Register"
import Login from "./src/screens/Login"
import Profile from './src/screens/Profile'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="HomeMenu" component={ HomeMenu } options={{headerShown:false}} />
          <Stack.Screen name="Comment" component={ CommentScreen } />
          <Stack.Screen name="Profile" component={ Profile } />
          <Stack.Screen name="Like" component={ Like } />
      </Stack.Navigator>
  

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
