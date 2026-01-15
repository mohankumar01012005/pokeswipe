"use client"

// ============================================================================
// ACTION BUTTONS COMPONENT - Like/Dislike Controls
// ============================================================================
// Provides primary interaction buttons for:
// - Liking Pokemon (add to collection)
// - Disliking Pokemon (skip to next)
// - Haptic feedback and animations
// ============================================================================

import { useRef } from "react"
import { View, Text, Pressable, StyleSheet, Animated } from "react-native"
import { commonColors } from "../theme/colors"

const ActionButtons = ({ onLike, onDislike, theme }) => {
  const likeScale = useRef(new Animated.Value(1)).current
  const dislikeScale = useRef(new Animated.Value(1)).current

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    onLike()
  }

  const handleDislikePress = () => {
    Animated.sequence([
      Animated.timing(dislikeScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dislikeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    onDislike()
  }

  return (
    <View style={styles.container}>
      {/* Dislike button - Red themed */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: dislikeScale }],
          },
        ]}
      >
        <Pressable
          style={[styles.button, styles.dislike]}
          onPress={handleDislikePress}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={styles.text}>Dislike</Text>
        </Pressable>
      </Animated.View>

      {/* Like button - Green themed */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: likeScale }],
          },
        ]}
      >
        <Pressable
          style={[styles.button, styles.like]}
          onPress={handleLikePress}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={styles.text}>Like</Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default ActionButtons

const styles = StyleSheet.create({
  // Main container for buttons
  container: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 20,
    gap: 12,
  },

  // Button container with animation support
  buttonContainer: {
    flex: 1,
  },

  // Base button styling
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  // Like button color scheme
  like: {
    backgroundColor: commonColors.like,
    shadowColor: commonColors.like,
  },

  // Dislike button color scheme
  dislike: {
    backgroundColor: commonColors.dislike,
    shadowColor: commonColors.dislike,
  },

  // Button text styling
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
})
