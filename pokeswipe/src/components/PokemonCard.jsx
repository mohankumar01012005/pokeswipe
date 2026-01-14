import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { typeColors, abilityColor } from "../utils/pokemonColors";

// Displays Pokémon details in a styled card
const PokemonCard = ({ pokemon }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />

      <Text style={styles.name}>{pokemon.name}</Text>

      {/* Pokémon Types */}
      <View style={styles.row}>
        {pokemon.types.map((type) => (
          <View
            key={type}
            style={[
              styles.chip,
              { backgroundColor: typeColors[type] || colors.gray },
            ]}
          >
            <Text style={styles.chipText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      {/* Pokémon Abilities */}
      <View style={styles.row}>
        {pokemon.abilities.map((ability) => (
          <View
            key={ability}
            style={[styles.chip, { backgroundColor: abilityColor }]}
          >
            <Text style={styles.chipText}>
              {ability.replace("-", " ").toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    width: 320,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    margin: 4,
  },
  chipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
