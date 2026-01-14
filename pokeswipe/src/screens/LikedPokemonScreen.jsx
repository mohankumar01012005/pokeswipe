import { View, Text, StyleSheet } from "react-native";

const LikedPokemonScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Liked Pokémon will appear here</Text>
    </View>
  );
};

export default LikedPokemonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
