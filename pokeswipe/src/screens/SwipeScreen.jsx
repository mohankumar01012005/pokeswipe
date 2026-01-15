"use client"

import React from "react"

// ============================================================================
// SWIPE/CARD SCREEN - Main Interaction Component
// ============================================================================
// Core gameplay screen featuring:
// - Pokemon card display with animated transitions
// - Like/Dislike action buttons with haptic feedback
// - Theme toggle in header (light/dark mode)
// - Navigation to Liked Pokemon collection via heart icon
// - Full theme and animation support
// ============================================================================

import { useRef, useContext } from "react"
import { View, ActivityIndicator, StyleSheet, Animated } from "react-native"
import { usePokemon } from "../hooks/usePokemon"
import { PokemonContext } from "../context/PokemonContext"
import PokemonCard from "../components/PokemonCard"
import ActionButtons from "../components/ActionButtons"
import { lightTheme, darkTheme } from "../theme/colors"

const SwipeScreen = ({ navigation }) => {
  const { data, isLoading, refetch } = usePokemon()
  const { state, dispatch } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme

  const cardScale = useRef(new Animated.Value(1)).current
  const cardOpacity = useRef(new Animated.Value(1)).current

  useContext(PokemonContext)

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.card,
      },
      headerRight: () => {
        const Pressable = require("react-native").Pressable
        const Text = require("react-native").Text
        return (
          <Pressable
            onPress={() => dispatch({ type: "TOGGLE_THEME" })}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            style={{ marginRight: 16 }}
          >
            <Text style={{ fontSize: 20 }}>{state.theme === "light" ? "🌙" : "☀️"}</Text>
          </Pressable>
        )
      },
    })
  }, [theme, state.theme, dispatch, navigation])

  const handleLike = () => {
    // Trigger like animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0.7,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start()

    // Update state and fetch next pokemon
    dispatch({ type: "LIKE_POKEMON", payload: data })
    refetch()
  }

  const handleDislike = () => {
    // Animate to next pokemon
    Animated.timing(cardOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
      refetch()
    })
  }

  const handleNavigateToLiked = () => {
    navigation.navigate("Liked")
  }

  // Show loading spinner while fetching pokemon data
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Animated Pokemon card */}
      <Animated.View
        style={[
          {
            transform: [{ scale: cardScale }],
            opacity: cardOpacity,
          },
        ]}
      >
        <PokemonCard pokemon={data} theme={theme} onNavigateToLiked={handleNavigateToLiked} />
      </Animated.View>

      {/* Like/Dislike action buttons */}
      <ActionButtons onLike={handleLike} onDislike={handleDislike} theme={theme} />
    </View>
  )
}

export default SwipeScreen

const styles = StyleSheet.create({
  // Full-height centered container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
})
