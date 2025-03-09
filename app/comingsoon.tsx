import { Text, View } from "react-native";

export default function Comingsoon() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D8DBE2",
      }}
    >
      <Text
        style={{
          fontSize: 36,
          maxWidth: "90%",
          alignSelf: "center",
        }}
      >
        This is coming soon, to go back to where you were, click on the dumbbell
        icon
      </Text>
    </View>
  );
}
