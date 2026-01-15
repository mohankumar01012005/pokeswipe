"use client"

// ============================================================================
// LIKED POKEMON SCREEN - Collection Display & Theme Control
// ============================================================================
// Displays user's collection with:
// - Grid layout of liked Pokemon with hover effects
// - Professional modal showing details on press
// - Dark/Light mode toggle in header
// - Navigation back to swipe screen
// - Empty state handling
// ============================================================================

import React, { useContext, useState, useRef } from "react"
import { View, Text, Image, FlatList, StyleSheet, Pressable, Animated } from "react-native"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme } from "../theme/colors"
import PokemonDetailsModal from "../components/PokemonDetailsModal"

const LikedPokemonScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme
  const scaleAnim = useRef(new Animated.Value(1)).current

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  React.useEffect(() => {
    navigation.setOptions({
      // Back button on left side
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={{ marginLeft: 12 }}
          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
        >
          <Text style={[styles.headerButton, { color: theme.text }]}>←</Text>
        </Pressable>
      ),

      // Theme toggle button on right side
      headerRight: () => (
        <Pressable
          onPress={() => dispatch({ type: "TOGGLE_THEME" })}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={{ marginRight: 16 }}
          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
        >
          <Text style={styles.themeToggle}>{state.theme === "light" ? "🌙" : "☀️"}</Text>
        </Pressable>
      ),

      // Header styling based on theme
      headerStyle: {
        backgroundColor: theme.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      },
      headerTintColor: theme.text,
      headerTitleStyle: {
        color: theme.text,
        fontWeight: "bold",
        fontSize: 16,
      },
    })
  }, [theme, state.theme, dispatch, navigation])

  const handlePokemonPress = (pokemon) => {
    setSelectedPokemon(pokemon)
    setModalVisible(true)
  }

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  if (state.likedPokemons.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyIcon]}>❤️</Text>
        <Text style={[styles.emptyText, { color: theme.text }]}>No Pokémon liked yet</Text>
        <Text style={[styles.emptySubtext, { color: theme.subText }]}>Start swiping to build your collection!</Text>
      </View>
    )
  }

  // Updated renderItem to add press handler for modal
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Pressable
          onPress={() => handlePokemonPress(item)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
          style={{ borderRadius: 16 }}
        >
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
            {/* Pokemon image with fallback */}
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

            {/* Pokemon name */}
            <Text style={[styles.name, { color: theme.text }]}>{item.name.toUpperCase()}</Text>
          </View>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={state.likedPokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        scrollIndicatorInsets={{ right: 1 }}
        showsVerticalScrollIndicator={true}
      />

      <PokemonDetailsModal
        visible={modalVisible}
        pokemon={selectedPokemon}
        theme={theme}
        onClose={() => setModalVisible(false)}
      />
    </View>
  )
}

export default LikedPokemonScreen

const styles = StyleSheet.create({
  // Container with flex
  container: {
    flex: 1,
  },

  // List container with padding
  list: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  // Column wrapper for 2-column grid
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  // Card container for animation
  cardContainer: {
    flex: 1,
    maxWidth: "48%",
  },

  // Individual pokemon card styling
  card: {
    margin: 6,
    borderRadius: 16,
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  // Image container and styling
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },

  // Pokemon name text styling
  name: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    letterSpacing: 0.3,
  },

  // Centered empty state container
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Empty state icon
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  // Empty state main text
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },

  // Empty state subtext
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 20,
  },

  // Header button styling
  headerButton: {
    fontSize: 24,
    fontWeight: "bold",
  },

  // Theme toggle button styling
  themeToggle: {
    fontSize: 20,
  },
})
