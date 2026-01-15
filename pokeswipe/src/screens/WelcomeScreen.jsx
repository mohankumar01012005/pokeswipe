"use client"

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors } from "../theme/colors"
import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
import { lightTheme, darkTheme } from "../theme/colors"

const WelcomeScreen = ({ navigation }) => {
  const { state } = useContext(PokemonContext)
  const theme = state.theme === "light" ? lightTheme : darkTheme

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>PokéSwipe</Text>
      <Text style={[styles.subtitle, { color: theme.subText }]}>Discover Pokémon and choose your favorites</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate("Swipe")}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
})
