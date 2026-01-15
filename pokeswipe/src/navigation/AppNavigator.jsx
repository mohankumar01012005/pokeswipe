"use client"

// ============================================================================
// APP NAVIGATOR - Navigation Structure & Screen Configuration
// ============================================================================
// Manages all screen transitions and route configuration:
// - Welcome screen (initial route with no header)
// - Swipe screen (main gameplay with theme toggle)
// - Liked screen (collection view)
// - Smooth slide animations between screens
// ============================================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext } from "react"
import WelcomeScreen from "../screens/WelcomeScreen"
import SwipeScreen from "../screens/SwipeScreen"
import LikedPokemonScreen from "../screens/LikedPokemonScreen"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme } from "../theme/colors"

const Stack = createNativeStackNavigator()

/**
 * AppNavigator - Root navigation component
 * Manages all screen transitions and header configurations
 * Added smooth slide animation for screen transitions
 */
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
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: theme.background,
        },
        animationEnabled: true,
        animationTypeForReplace: false,
        gestureEnabled: true,
        gestureResponseDistance: 50,
      }}
    >
      {/* Welcome screen - initial route with no header */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          },
        }}
      />

      {/* Swipe screen - main gameplay screen with theme toggle */}
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{
          title: "pokéAPI",
          headerTitleAlign: "center",
          animationEnabled: true,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                    })
                  : 0,
              },
            }
          },
        }}
      />

      {/* Liked Pokemon screen - collection view with theme toggle and modal */}
      <Stack.Screen
        name="Liked"
        component={LikedPokemonScreen}
        options={{
          title: "Pokémon you have liked ❤️",
          headerTitleAlign: "center",
          animationEnabled: true,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                    })
                  : 0,
              },
            }
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
