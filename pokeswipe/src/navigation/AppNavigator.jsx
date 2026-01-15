"use client"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext } from "react"

import WelcomeScreen from "../screens/WelcomeScreen"
import SwipeScreen from "../screens/SwipeScreen"
import LikedPokemonScreen from "../screens/LikedPokemonScreen"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme } from "../theme/colors"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const { state } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          color: theme.text,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

      {/* Removed theme toggle and heart button from header
          These are now integrated into SwipeScreen and LikedPokemonScreen */}
      <Stack.Screen name="Swipe" component={SwipeScreen} options={{ title: "PokéAPI" }} />

      {/* Added custom header with back button and theme toggle
          Theme toggle now appears on LikedPokemonScreen header */}
      <Stack.Screen name="Liked" component={LikedPokemonScreen} options={{ title: "Pokémon you have liked ❤️" }} />
    </Stack.Navigator>
  )
}

export default AppNavigator
