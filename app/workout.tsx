import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DropdownComponent from "../components/DropdownComponent";
import { Card } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Workout() {
  const [value, setValue] = useState("");

  // Load value from AsyncStorage when the component mounts
  useEffect(() => {
    const loadValue = async () => {
      try {
        const savedValue = await AsyncStorage.getItem("selectedWorkout");
        if (savedValue !== null) {
          setValue(savedValue); // Set the state if a value is saved
        }
      } catch (error) {
        console.error("Error loading value from AsyncStorage", error);
      }
    };

    loadValue();
  }, []);

  // Save value to AsyncStorage whenever it changes
  const saveValue = async (newValue) => {
    try {
      await AsyncStorage.setItem("selectedWorkout", newValue);
    } catch (error) {
      console.error("Error saving value to AsyncStorage", error);
    }
  };

  // Handle value change in dropdown
  const handleValueChange = (newValue) => {
    setValue(newValue); // Update state
    saveValue(newValue); // Save to AsyncStorage
  };

  const handleCardClick = (value) => {
    switch (value) {
      case "full":
        router.navigate("/workoutscreen");
        break;
      default:
        router.navigate("/comingsoon");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#D8DBE2",
      }}
    >
      <View style={{ width: "100%" }}>
        <DropdownComponent setState={handleValueChange} />
      </View>
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        {/* Check if value is 'push' */}
        {value === "push" && (
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                handleCardClick("push");
              }}
            >
              <Card containerStyle={{ borderRadius: 12, width: "90%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                >
                  <View>
                    <Text style={styles.header}>Push day</Text>
                    <Text style={styles.description}>Total sets: 12</Text>
                    <Text style={styles.description}>Total time: 45min</Text>
                  </View>
                  <View>
                    <Text style={styles.secondHeading}>Targeted muscles</Text>
                    <Text style={styles.secondDescription}>Chest</Text>
                    <Text style={styles.secondDescription}>Shoulders</Text>
                    <Text style={styles.secondDescription}>Triceps</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleCardClick("upper");
              }}
            >
              <Card containerStyle={{ borderRadius: 12, width: "90%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                >
                  <View>
                    <Text style={styles.header}>Upper body</Text>
                    <Text style={styles.description}>Total sets: 9</Text>
                    <Text style={styles.description}>Total time: 35min</Text>
                  </View>
                  <View>
                    <Text style={styles.secondHeading}>Targeted muscles</Text>
                    <Text style={styles.secondDescription}>Chest</Text>
                    <Text style={styles.secondDescription}>Shoulders</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        )}

        {/* Check if value is 'pull' */}
        {value === "pull" && (
          <TouchableOpacity
            onPress={() => {
              handleCardClick("pull");
            }}
          >
            <Card containerStyle={{ borderRadius: 12, width: "90%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <View>
                  <Text style={styles.header}>Pull day</Text>
                  <Text style={styles.description}>Total sets: 10</Text>
                  <Text style={styles.description}>Total time: 40min</Text>
                </View>
                <View>
                  <Text style={styles.secondHeading}>Targeted muscles</Text>
                  <Text style={styles.secondDescription}>Back</Text>
                  <Text style={styles.secondDescription}>Biceps</Text>
                  <Text style={styles.secondDescription}>Forearms</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}

        {/* Check if value is 'legs' */}
        {value === "legs" && (
          <TouchableOpacity
            onPress={() => {
              handleCardClick("legs");
            }}
          >
            <Card containerStyle={{ borderRadius: 12, width: "90%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <View>
                  <Text style={styles.header}>Leg day</Text>
                  <Text style={styles.description}>Total sets: 14</Text>
                  <Text style={styles.description}>Total time: 50min</Text>
                </View>
                <View>
                  <Text style={styles.secondHeading}>Targeted muscles</Text>
                  <Text style={styles.secondDescription}>Quads</Text>
                  <Text style={styles.secondDescription}>Hamstrings</Text>
                  <Text style={styles.secondDescription}>Glutes</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}

        {/* Check if value is 'full' */}
        {value === "full" && (
          <TouchableOpacity
            onPress={() => {
              handleCardClick("full");
            }}
          >
            <Card containerStyle={{ borderRadius: 12, width: "90%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <View>
                  <Text style={styles.header}>Full Body</Text>
                  <Text style={styles.description}>Total sets: 18</Text>
                  <Text style={styles.description}>Total time: 60min</Text>
                </View>
                <View>
                  <Text style={styles.secondHeading}>Targeted muscles</Text>
                  <Text style={styles.secondDescription}>Full Body</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 4,
    color: "#02394A",
  },
  description: {
    marginBottom: 2,
    fontSize: 16,
  },
  secondHeading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    color: "#02394A",
  },
  secondDescription: {
    alignSelf: "flex-end",
    fontSize: 16,
  },
});
