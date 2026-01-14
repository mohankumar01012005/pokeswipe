import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

// Displays Pokémon details in a card format
const PokemonCard = ({ pokemon }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />

      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.row}>
        {pokemon.types.map((type) => (
          <Text key={type} style={styles.tag}>
            {type}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        {pokemon.abilities.map((ability) => (
          <Text key={ability} style={styles.subTag}>
            {ability}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: 320,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
  },
  subTag: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    margin: 4,
    fontSize: 12,
  },
});
