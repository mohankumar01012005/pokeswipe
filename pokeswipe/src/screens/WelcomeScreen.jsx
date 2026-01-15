"use client"

import React, { useEffect } from "react"
import { View, Text, Pressable, StyleSheet, Animated } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme, commonColors } from "../theme/colors"

const WelcomeScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme
  const insets = useSafeAreaInsets()

  const logoScale = React.useRef(new Animated.Value(0.5)).current
  const logoOpacity = React.useRef(new Animated.Value(0)).current
  const textSlide = React.useRef(new Animated.Value(50)).current
  const textOpacity = React.useRef(new Animated.Value(0)).current
  const buttonScale = React.useRef(new Animated.Value(0.8)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
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

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.bgBlob,
          {
            backgroundColor: state.theme === "light" ? "rgba(251, 191, 36, 0.08)" : "rgba(251, 191, 36, 0.05)",
          },
        ]}
      />

      <Pressable
        onPress={handleThemeToggle}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        style={[styles.themeToggle, { top: insets.top + 16 }]}
      >
        <Text style={styles.themeToggleText}>{state.theme === "light" ? "🌙" : "☀️"}</Text>
      </Pressable>

      <View style={[styles.contentContainer, { paddingTop: insets.top + 20 }]}>
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

        <View style={styles.heartAccent}>
          <Text style={styles.heartIcon}>♡</Text>
        </View>

        <Animated.View
          style={[
            styles.welcomeContent,
            {
              transform: [{ translateY: textSlide }],
              opacity: textOpacity,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>How to Play PokéSwipe</Text>

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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  bgBlob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -100,
    right: -100,
  },

  themeToggle: {
    position: "absolute",
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  themeToggleText: {
    fontSize: 20,
  },

  contentContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 60,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

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

  welcomeContent: {
    alignItems: "center",
    marginBottom: 48,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 28,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  instructionsContainer: {
    width: "100%",
    gap: 16,
  },

  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    gap: 12,
  },

  bulletPoint: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -2,
  },

  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    fontWeight: "500",
  },

  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
})
