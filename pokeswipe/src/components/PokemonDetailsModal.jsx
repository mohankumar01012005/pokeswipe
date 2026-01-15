"use client"

// ============================================================================
// POKEMON DETAILS MODAL - Professional Detail Display
// ============================================================================
// Displays comprehensive Pokemon information in a beautiful modal:
// - Pokemon image, name, types, and abilities
// - Slide-up animation for modal entrance
// - Smooth fade background with blur effect
// - Theme-aware dark/light mode styling
// ============================================================================

import { useRef, useEffect } from "react"
import { View, Text, Image, Modal, StyleSheet, Pressable, Animated } from "react-native"

/**
 * PokemonDetailsModal - Displays detailed pokemon information
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Control modal visibility
 * @param {Object} props.pokemon - Pokemon data object
 * @param {Object} props.theme - Current theme colors
 * @param {Function} props.onClose - Callback when modal closes
 */
const PokemonDetailsModal = ({ visible, pokemon, theme, onClose }) => {
  const slideAnim = useRef(new Animated.Value(500)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Animate modal slide up and background fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Animate modal slide down and background fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  if (!pokemon) return null

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      {/* Semi-transparent background with fade animation */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      {/* Modal content - slides up from bottom */}
      <Animated.View
        style={[
          styles.modalContent,
          {
            backgroundColor: theme.card,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Close button - top right */}
        <Pressable onPress={onClose} style={styles.closeButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Text style={[styles.closeButtonText, { color: theme.text }]}>✕</Text>
        </Pressable>

        {/* Pokemon image */}
        <Image source={{ uri: pokemon.image }} style={styles.modalImage} resizeMode="contain" />

        {/* Pokemon name - large and prominent */}
        <Text style={[styles.modalName, { color: theme.text }]}>{pokemon.name.toUpperCase()}</Text>

        {/* Pokemon ID/Number */}
        <Text style={[styles.modalId, { color: theme.subText }]}>#{pokemon.id}</Text>

        {/* Types section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Types</Text>
          <View style={styles.badgesRow}>
            {pokemon.types.map((type) => (
              <View
                key={type}
                style={[
                  styles.badge,
                  {
                    backgroundColor: getTypeColor(type),
                  },
                ]}
              >
                <Text style={styles.badgeText}>{type.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Abilities section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Abilities</Text>
          <View style={styles.badgesRow}>
            {pokemon.abilities.map((ability) => (
              <View
                key={ability}
                style={[
                  styles.badge,
                  {
                    backgroundColor: "#8B5CF6",
                  },
                ]}
              >
                <Text style={styles.badgeText}>{ability.replace("-", " ").toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Close button at bottom */}
        <Pressable onPress={onClose} style={[styles.closeModalButton, { backgroundColor: theme.text }]}>
          <Text style={[styles.closeModalButtonText, { color: theme.card }]}>Close</Text>
        </Pressable>
      </Animated.View>
    </Modal>
  )
}

/**
 * Helper function to get color for pokemon type
 * @param {string} type - Pokemon type
 * @returns {string} - Color hex code
 */
const getTypeColor = (type) => {
  const typeColorMap = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  }
  return typeColorMap[type.toLowerCase()] || "#999999"
}

export default PokemonDetailsModal

const styles = StyleSheet.create({
  // Backdrop covering entire screen
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  // Pressable area for closing modal
  backdropPressable: {
    flex: 1,
  },

  // Modal content container - slides up from bottom
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    minHeight: "70%",
  },

  // Close button positioned at top right
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  // Close button text styling
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  // Pokemon image in modal
  modalImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 16,
  },

  // Pokemon name in modal - large and prominent
  modalName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 1,
  },

  // Pokemon ID styling
  modalId: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },

  // Section container for types and abilities
  section: {
    marginBottom: 20,
  },

  // Section title styling
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // Row container for badges
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // Badge/chip styling
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },

  // Badge text styling
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },

  // Close modal button at bottom
  closeModalButton: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  // Close modal button text
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
})
