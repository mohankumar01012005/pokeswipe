import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { typeColors, abilityColor } from "../utils/pokemonColors"

const PokemonCard = ({ pokemon, theme, onNavigateToLiked }) => {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.subText }]}>
      <Pressable
        style={styles.heartButton}
        onPress={onNavigateToLiked}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Text style={styles.heartIcon}>♡</Text>
      </Pressable>

      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.text }]}>{pokemon.name}</Text>

      <View style={styles.row}>
        {pokemon.types.map((type) => (
          <View key={type} style={[styles.chip, { backgroundColor: typeColors[type] }]}>
            <Text style={styles.chipText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.row}>
        {pokemon.abilities.map((ability) => (
          <View key={ability} style={[styles.chip, { backgroundColor: abilityColor }]}>
            <Text style={styles.chipText}>{ability.replace("-", " ").toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default PokemonCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    width: 320,
    alignItems: "center",
    borderWidth: 2,
    position: "relative",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFC0CB",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  heartIcon: {
    fontSize: 28,
    color: "#E91E63",
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 12,
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
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
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
})
