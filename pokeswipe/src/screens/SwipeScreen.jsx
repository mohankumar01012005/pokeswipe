"use client"

import { View, ActivityIndicator, StyleSheet } from "react-native"
import { useContext } from "react"

import { usePokemon } from "../hooks/usePokemon"
import { PokemonContext } from "../context/PokemonContext"
import PokemonCard from "../components/PokemonCard"
import ActionButtons from "../components/ActionButtons"
import { lightTheme, darkTheme } from "../theme/colors"

const SwipeScreen = ({ navigation }) => {
  const { data, isLoading, refetch } = usePokemon()
  const { state, dispatch } = useContext(PokemonContext)

  const theme = state.theme === "light" ? lightTheme : darkTheme

  const handleLike = () => {
    dispatch({ type: "LIKE_POKEMON", payload: data })
    refetch()
  }

  const handleDislike = () => {
    refetch()
  }

  const handleNavigateToLiked = () => {
    navigation.navigate("Liked")
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <PokemonCard pokemon={data} theme={theme} onNavigateToLiked={handleNavigateToLiked} />
      <ActionButtons onLike={handleLike} onDislike={handleDislike} theme={theme} />
    </View>
  )
}

export default SwipeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
