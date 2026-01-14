import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { usePokemon } from "../hooks/usePokemon";

const SwipeScreen = () => {
  const { data, isLoading, isError } = usePokemon();

  console.log("📦 Data received in SwipeScreen:", data);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Pokémon...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error loading Pokémon</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.name}>{data.name}</Text>
      <Text>Types: {data.types.join(", ")}</Text>
      <Text>Abilities: {data.abilities.join(", ")}</Text>
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
