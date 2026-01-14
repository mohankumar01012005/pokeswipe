import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useContext } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonContext } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import ActionButtons from "../components/ActionButtons";
import { colors } from "../theme/colors";

// Main swipe screen
const SwipeScreen = () => {
  const { data, isLoading, refetch } = usePokemon();
  const { dispatch } = useContext(PokemonContext);

  const handleLike = () => {
    dispatch({ type: "LIKE_POKEMON", payload: data });
    refetch(); // Load next Pokémon
  };

  const handleDislike = () => {
    refetch(); // Skip Pokémon
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <PokemonCard pokemon={data} />
      <ActionButtons onLike={handleLike} onDislike={handleDislike} />
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
});
