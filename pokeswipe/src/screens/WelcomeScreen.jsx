"use client"

// ============================================================================
// WELCOME SCREEN - First Impression Component
// ============================================================================
// Displays an engaging introduction to PokéSwipe with:
// - Animated Pokemon logo
// - Instructions for gameplay
// - CTA button to start the experience
// - Full theme support (light/dark mode)
// ============================================================================

import React, { useEffect } from "react"
import { View, Text, Pressable, StyleSheet, Animated, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme, commonColors } from "../theme/colors"

const WelcomeScreen = ({ navigation }) => {
  const { state } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()

  const logoScale = React.useRef(new Animated.Value(0.5)).current
  const logoOpacity = React.useRef(new Animated.Value(0)).current
  const textSlide = React.useRef(new Animated.Value(50)).current
  const textOpacity = React.useRef(new Animated.Value(0)).current
  const buttonScale = React.useRef(new Animated.Value(0.8)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Logo entrance animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Text entrance animation
      Animated.parallel([
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Button entrance animation
      Animated.parallel([
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])

  const handleStartPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("Swipe")
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background decorative elements */}
      <View
        style={[
          styles.bgBlob,
          {
            backgroundColor: state.theme === "light" ? "rgba(251, 191, 36, 0.08)" : "rgba(251, 191, 36, 0.05)",
          },
        ]}
      />

      {/* Main content container */}
      <View style={[styles.contentContainer, { paddingTop: insets.top + 20 }]}>
        {/* Pokemon Logo with animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Text style={styles.pokemonLogo}>pokéAPI</Text>
        </Animated.View>

        {/* Heart accent icon */}
        <View style={styles.heartAccent}>
          <Text style={styles.heartIcon}>♡</Text>
        </View>

        {/* Welcome content with animation */}
        <Animated.View
          style={[
            styles.welcomeContent,
            {
              transform: [{ translateY: textSlide }],
              opacity: textOpacity,
            },
          ]}
        >
          {/* Main title */}
          <Text style={[styles.title, { color: theme.text }]}>How to Play PokéSwipe</Text>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionItem}>
              <Text style={[styles.bulletPoint, { color: commonColors.primary }]}>•</Text>
              <Text style={[styles.instructionText, { color: theme.subText }]}>Pokémon Appear One at a Time</Text>
            </View>

            <View style={styles.instructionItem}>
              <Text style={[styles.bulletPoint, { color: commonColors.primary }]}>•</Text>
              <Text style={[styles.instructionText, { color: theme.subText }]}>Choose "Like" or "Dislike"</Text>
            </View>

            <View style={styles.instructionItem}>
              <Text style={[styles.bulletPoint, { color: commonColors.primary }]}>•</Text>
              <Text style={[styles.instructionText, { color: theme.subText }]}>Build Your Favorite Team</Text>
            </View>
          </View>
        </Animated.View>

        {/* CTA Button with animation */}
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [{ scale: buttonScale }],
              opacity: buttonOpacity,
            },
          ]}
        >
          <Pressable
            style={[
              styles.button,
              { backgroundColor: commonColors.like },
              {
                shadowColor: commonColors.like,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              },
            ]}
            onPress={handleStartPress}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Text style={styles.buttonText}>Let's Go!</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  // Main container with full flex layout
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  // Background decorative blob
  bgBlob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -100,
    right: -100,
  },

  // Content wrapper with padding
  contentContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 60,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  // Pokemon logo styling
  logoContainer: {
    marginBottom: 32,
  },

  pokemonLogo: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FBBF24",
    letterSpacing: 2,
    fontStyle: "italic",
  },

  // Heart accent positioned at top-right
  heartAccent: {
    position: "absolute",
    top: 80,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EC4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  heartIcon: {
    fontSize: 32,
    color: "#FFFFFF",
  },

  // Welcome content container
  welcomeContent: {
    alignItems: "center",
    marginBottom: 48,
  },

  // Main title with handwritten feel
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 28,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // Instructions list container
  instructionsContainer: {
    width: "100%",
    gap: 16,
  },

  // Individual instruction item
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    gap: 12,
  },

  // Bullet point styling
  bulletPoint: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -2,
  },

  // Instruction text styling
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    fontWeight: "500",
  },

  // Button wrapper for animation
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
  },

  // CTA button styling
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },

  // Button text styling
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
})
