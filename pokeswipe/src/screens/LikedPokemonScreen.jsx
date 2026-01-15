"use client"

import React from "react"

import { View, Text, Image, FlatList, StyleSheet, Pressable } from "react-native"
import { useContext } from "react"

import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme } from "../theme/colors"

const LikedPokemonScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={{ marginLeft: 12 }}
        >
          <Text style={{ fontSize: 20, color: theme.text }}>←</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => dispatch({ type: "TOGGLE_THEME" })}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={{ marginRight: 16 }}
        >
          <Text style={{ fontSize: 20 }}>{state.theme === "light" ? "🌙" : "☀️"}</Text>
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: theme.card,
      },
      headerTintColor: theme.text,
      headerTitleStyle: {
        color: theme.text,
        fontWeight: "bold",
      },
    })
  }, [theme, state.theme, dispatch, navigation])

  if (state.likedPokemons.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.text }]}>No Pokémon liked yet ❤️</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.subText }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.text }]}>{item.name.toUpperCase()}</Text>
    </View>
  )

  return (
    <FlatList
      data={state.likedPokemons}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[styles.list, { backgroundColor: theme.background }]}
      renderItem={renderItem}
      scrollIndicatorInsets={{ right: 1 }}
    />
  )
}

export default LikedPokemonScreen

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    maxWidth: "48%",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
})
