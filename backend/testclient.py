#!/usr/bin/env python
from websockets.sync.client import connect
import json

class Event:
    def __init__(self, time, rep, set, type):
        self.time = time
        self.rep = rep
        self.set = set
        self.type = type

    def to_dict(self):
        return {
            "time": self.time,
            "rep": self.rep,
            "set": self.set,
            "type": self.type
        }

# Create some event instances
event = Event(time=3, rep=3, set=1, type="pushup")
event1 = Event(time=5, rep=5, set=2, type="squat")
events = [event, event1]

def hello():
    uri = "ws://localhost:8001"
    with connect(uri) as websocket:
        # Convert the list of events to a list of dictionaries
        events_dict = [e.to_dict() for e in events]
        
        # Send the JSON array to the server
        websocket.send(json.dumps(events_dict))
        print(f">>> {events_dict}")

        # Receive a response from the server
        try:
            while True:
                greeting = websocket.recv()
                print(f"<<< Received: {greeting}")
        except KeyboardInterrupt:
            print("Client disconnected.")
if __name__ == "__main__":
    hello()