import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import CommentScreen from "./src/screens/Comment";
import Like from './src/screens/Like'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={ Home } />
          <Stack.Screen name="Comment" component={ CommentScreen } />
          <Stack.Screen name="Like" component={ Like } />
      </Stack.Navigator>
    </NavigationContainer>
    // <Home />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Register"
    //       component={Register}
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={Login}
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="HomeMenu"
    //       component={HomeMenu}
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
