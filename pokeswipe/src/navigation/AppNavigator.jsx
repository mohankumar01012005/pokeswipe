import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SwipeScreen from "../screens/SwipeScreen";
import LikedPokemonScreen from "../screens/LikedPokemonScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Swipe" component={SwipeScreen} />
      <Stack.Screen name="Liked" component={LikedPokemonScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
