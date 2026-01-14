import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

// Welcome screen with entry CTA
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokéSwipe</Text>
      <Text style={styles.subtitle}>
        Discover Pokémon and choose your favorites
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Swipe")}
      >
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.gray,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
