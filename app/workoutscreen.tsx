import { Card } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function WorkoutScreen() {
  const [state, setState] = useState("working");
  const [exercise, setExercise] = useState("pushups");
  const [set, setSet] = useState(2);
  const [reps, setReps] = useState(9);
  const [sleepTime, setSleepTime] = useState(120);

  let ws = useRef(new WebSocket("ws://localhost:8001")).current;

  useEffect(() => {
    ws.onopen = () => {
      const events = [
        { type: "pushup", rep: 12, set: 3, time: 120 },
        { type: "squat", rep: 12, set: 3, time: 120 },
        { type: "curls", rep: 12, set: 3, time: 120 },
      ];

      submitEvent(events);
    };

    ws.onmessage = (e) => {
      const message = String(e.data);
      switch (message.substring(0, message.indexOf(":")).toLowerCase()) {
        case "set":
          setSet(Number(message.substring(message.indexOf(":") + 1)));
          break;
        case "rep":
          setReps(Number(message.substring(message.indexOf(":") + 1)));
          break;
        case "time":
          setState("resting");
          setSleepTime(Number(message.substring(message.indexOf(":") + 1)));
          break;
        case "start":
          setState("working");
          setExercise(message.substring(message.indexOf(":")) + 1);
          break;
      }
    };

    ws.onerror = (e) => { };

    ws.onclose = (e) => { };
  }, []);

  function submitEvent(
    events: [
      {
        type: string;
        set: Number;
        rep: Number;
        time: Number;
      },
    ],
  ) {
    ws.send(JSON.stringify(events));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D8DBE2",
      }}
    >
      {state === "working" ? (
        <View style={{ flex: 1, gap: 8, justifyContent: "center" }}>
          <Card containerStyle={{ padding: 24, borderRadius: 12 }}>
            <Text
              style={{
                fontSize: 24,
                color: "#02394a",
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              Current exercise:
            </Text>
            <Text
              style={{
                fontSize: 36,
                color: "#02394a",
                fontWeight: "700",
                alignSelf: "center",
              }}
            >
              {exercise}
            </Text>
          </Card>
          <Card containerStyle={{ padding: 24, borderRadius: 12 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 600,
                alignSelf: "center",
                color: "#02394a",
              }}
            >
              Set: {set}
            </Text>
          </Card>
          <Card containerStyle={{ padding: 24, borderRadius: 12 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 500,
                alignSelf: "center",
                marginBottom: 8,
                paddingBottom: 12,
                borderBottomWidth: 1,
              }}
            >
              Repetitions:{" "}
            </Text>
            <Text
              style={{
                fontSize: 48,
                fontWeight: 700,
                alignSelf: "center",
              }}
            >
              {" "}
              {reps}{" "}
            </Text>
          </Card>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 600,
              alignSelf: "center",
              textAlign: "center",
              marginBottom: 36,
            }}
          >
            This is time to recharge.
          </Text>
          <Text style={{ fontSize: 48 }}>{sleepTime} seconds left</Text>
        </View>
      )}
    </View>
  );
}
