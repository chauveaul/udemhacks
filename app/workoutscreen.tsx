import { Card } from "@rneui/themed";
import { router } from "expo-router";
import * as Network from 'expo-network';
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import * as Constants from 'expo-constants';

export default function WorkoutScreen() {
  const [state, setState] = useState("working");
  const [exercise, setExercise] = useState("pushups");
  const [set, setSet] = useState(0);
  const [reps, setReps] = useState(0);
  const [sleepTime, setSleepTime] = useState(6);

  const [wsState, setWsState] = useState("local")
  let ws = useRef(new WebSocket("ws://192.168.2.77:8001")).current;

  //  useEffect(() => {
  //    console.log("useEffect running...");
  //
  //    async function getIp() {
  //      try {
  //        const ip = await Network.getIpAddressAsync();
  //        return ip;
  //      } catch (error) {
  //        console.error("Failed to get IP:", error);
  //        return null;
  //      }
  //    }
  //
  //    getIp()
  //      .then((ip) => {
  //        if (!ip) return;
  //        console.log("Device IP:", ip);
  //
  //        if (ip !== Constants.default.expoConfig?.hostUri?.split(":")[0] && ws.CLOSED) {
  //          setState("not local");
  //          console.log("not local");
  //          ws = new WebSocket("ws://192.168.2.77:8001");
  //          console.log(ws)
  //        }
  //      })
  //      .catch((error) => console.error("Error processing IP:", error));
  //  }, []);
  //
  useEffect(() => {
    if (ws) {
      console.log(ws)
      ws.onopen = () => {
        const events = [
          { type: "pushup", rep: 2, set: 1, time: 6 },
          { type: "squat", rep: 2, set: 1, time: 6 },
          { type: "curls", rep: 2, set: 1, time: 6 },
          { type: "close", rep: 0, set: 0, time: 0 },
        ];

        submitEvent(events);
      };

      ws.onmessage = (e) => {
        const message = String(e.data);
        console.log(message)
        switch (message.substring(0, message.indexOf(":")).toLowerCase()) {
          case "set":
            setSet(Number(message.substring(message.indexOf(":") + 1)));
            break;
          case "rep":
            setReps(Number(message.substring(message.indexOf(":") + 1)));
            break;
          case "time":
            setState("resting");
            setSet(0)
            setReps(0)
            setSleepTime(Number(message.substring(message.indexOf(":") + 1)));
            break;
          case "start":
            setState("working");
            setExercise(message.substring(message.indexOf(":") + 1));
            break;
        }
      };

      ws.onerror = (e) => { };

      ws.onclose = (e) => {
        router.navigate("/workout")
      };
    }
  }, [ws, wsState]);

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
