import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { HomeIcon, DumbbellIcon, MealsIcon } from "@/assets/icons";

const styles = StyleSheet.create({
  header: {
    height: 150, // Custom height
    backgroundColor: "#D8DBE2", // Background color
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60, // Adjust for status bar (optional)
    paddingBottom: 10,
    borderBottomWidth: 1,
    paddingLeft: 10,
    width: "100%",
    maxWidth: "85%",
    alignSelf: "center",
  },
  title: {
    fontSize: 58, // Large title size
    fontWeight: "bold",
    color: "#02394A", // Title color
  },
  container: {
    backgroundColor: "#D8DBE2",
  },
});

function CustomHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FormFlow</Text>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#D8DBE2", height: 90 }, // Bottom tab styling
        tabBarActiveTintColor: "#02394A",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 5,
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <CustomHeader />, // Custom Header on top
          tabBarIcon: ({ color, size }) => <HomeIcon />,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          header: () => <CustomHeader />, // Custom Header here too
          tabBarIcon: ({ color, size }) => <DumbbellIcon />,
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          header: () => <CustomHeader />, // Custom Header
          tabBarIcon: ({ color, size }) => <MealsIcon />,
        }}
      />

      <Tabs.Screen
        name="comingsoon"
        options={{
          title: "Coming Soon",
          header: () => <CustomHeader />, // Custom Header
          tabBarIcon: ({ color, size }) => <MealsIcon />,
          href: null,
        }}
      />

      <Tabs.Screen
        name="workoutscreen"
        options={{
          title: "Workout Screen",
          header: () => <CustomHeader />, // Custom Header
          tabBarIcon: ({ color, size }) => <MealsIcon />,
          href: null,
        }}
      />
    </Tabs>
  );
}
