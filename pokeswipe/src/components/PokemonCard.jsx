"use client"

// ============================================================================
// POKEMON CARD COMPONENT - Card Display & Interaction
// ============================================================================
// Displays individual pokemon with:
// - High-quality image display
// - Type and ability badges
// - Heart button for navigation to liked screen
// - Theme-aware styling
// ============================================================================

import { useRef } from "react"
import { View, Text, Image, StyleSheet, Pressable, Animated } from "react-native"
import { typeColors, abilityColor } from "../utils/pokemonColors"

const PokemonCard = ({ pokemon, theme, onNavigateToLiked }) => {
  const heartScale = useRef(new Animated.Value(1)).current

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    onNavigateToLiked()
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.text,
        },
      ]}
    >
      {/* Heart button - Top right corner for navigation */}
      <Animated.View
        style={[
          styles.heartButton,
          {
            transform: [{ scale: heartScale }],
          },
        ]}
      >
        <Pressable
          onPress={handleHeartPress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={styles.heartPressable}
        >
          <Text style={styles.heartIcon}>♡</Text>
        </Pressable>
      </Animated.View>

      {/* Pokemon image display */}
      <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />

      {/* Pokemon name in uppercase */}
      <Text style={[styles.name, { color: theme.text }]}>{pokemon.name}</Text>

      {/* Type badges */}
      <View style={styles.row}>
        {pokemon.types.map((type) => (
          <View key={type} style={[styles.chip, { backgroundColor: typeColors[type] || "#999999" }]}>
            <Text style={styles.chipText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      {/* Ability badges */}
      <View style={styles.row}>
        {pokemon.abilities.map((ability) => (
          <View key={ability} style={[styles.chip, { backgroundColor: abilityColor }]}>
            <Text style={styles.chipText}>{ability.replace("-", " ").toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default PokemonCard

const styles = StyleSheet.create({
  // Main card container
  card: {
    borderRadius: 20,
    padding: 20,
    width: 320,
    alignItems: "center",
    borderWidth: 2,
    position: "relative",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  // Heart button - positioned absolutely at top-right
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#EC4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },

  // Pressable area for heart button
  heartPressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // Heart icon styling
  heartIcon: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Pokemon image container
  image: {
    width: 160,
    height: 160,
    marginBottom: 12,
    marginTop: 16,
  },

  // Pokemon name styling
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // Flex row for badge layout
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },

  // Badge/chip styling for types and abilities
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    margin: 4,
  },

  // Badge text styling
  chipText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
})
