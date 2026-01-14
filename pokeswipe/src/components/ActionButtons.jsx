import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

// Like / Dislike buttons
const ActionButtons = ({ onLike, onDislike }) => {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.dislike]} onPress={onDislike}>
        <Text style={styles.text}>Dislike</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.like]} onPress={onLike}>
        <Text style={styles.text}>Like</Text>
      </Pressable>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  like: {
    backgroundColor: colors.like,
  },
  dislike: {
    backgroundColor: colors.dislike,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  },
});
