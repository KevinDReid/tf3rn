import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Home />
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
