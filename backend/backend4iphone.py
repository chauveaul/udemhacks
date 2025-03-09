import asyncio
import cv2
from ultralytics import YOLO, solutions
import time
import json
import websockets


async def pushup(push, t, type, websocket):
    time.sleep(t)

    # Load video
    cap = cv2.VideoCapture(0)
    assert cap.isOpened(), "Error reading video file"
    w, h, fps = (
        int(cap.get(x))
        for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS)
    )

    # Video writer
    video_writer = cv2.VideoWriter(
        "workouts.avi", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h)
    )

    # Init AIGym for push-up tracking
    pushup_tracker = solutions.AIGym(
        line_thickness=2, view_img=True, pose_type="pushup", kpts=[6, 8, 10]
    )

    pushup_count = 0  # Initialize push-up count
    count = 0
    await sendMessage(f"start:{type}", websocket)
    # Process video
    while cap.isOpened():
        success, im0 = cap.read()
        if not success:
            print(f"Total push-ups performed: {pushup_count}")
            break

        # Process frame using AIGym
        im0 = pushup_tracker.monitor(im0)

        # Get the detected push-up count (if available)
        if hasattr(pushup_tracker, "count"):  # Check if `count` attribute exists
            count_data = pushup_tracker.count
            if (
                isinstance(count_data, list) and count_data
            ):  # Ensure it's a non-empty list
                pushup_count = count_data[0]  # Take the first value
            elif isinstance(count_data, int):  # If it's already an int
                pushup_count = count_data
            else:
                pushup_count = 0  # Default value if it's empty or unexpected

        # Display count on frame
        cv2.putText(
            im0,
            f"{type}: {pushup_count}",
            (50, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )

        # Write frame to video
        video_writer.write(im0)

        # Show frame
        cv2.imshow("Workout Tracker", im0)
        print(pushup_count)
        if count != pushup_count:
            count = pushup_count
            await sendMessage(f"rep:{count}", websocket)
            print(f" __New Value__ {count}")

        # **Exit if push-up count reaches 5 or more**
        if pushup_count >= push:
            print(f"{type} goal reached! Exiting... Total push-ups: {pushup_count}")
            break

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    # Cleanup
    video_writer.release()
    cap.release()
    cv2.destroyAllWindows()

    # Print final push-up count
    print(f"Final {type} count: {pushup_count}")


async def sendMessage(message, websocket):
    await websocket.send(message)


async def squat(squat, t, websocket):
    time.sleep(t)

    # Load video
    cap = cv2.VideoCapture(0)
    assert cap.isOpened(), "Error reading video file"
    w, h, fps = (
        int(cap.get(x))
        for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS)
    )

    # Video writer
    video_writer = cv2.VideoWriter(
        "workouts.avi", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h)
    )

    # Init AIGym for push-up tracking
    squat_tracker = solutions.AIGym(
        line_thickness=2, view_img=True, pose_type="squat", kpts=[12, 14, 16]
    )

    await sendMessage("start:squat", websocket)
    pushup_count = 0  # Initialize squat count
    count = -1
    # Process video
    while cap.isOpened():
        success, im0 = cap.read()
        if not success:
            print(f"Total push-ups performed: {pushup_count}")
            break

        # Process frame using AIGym
        im0 = squat_tracker.monitor(im0)

        # Get the detected push-up count (if available)
        if hasattr(squat_tracker, "count"):  # Check if `count` attribute exists
            count_data = squat_tracker.count
            if (
                isinstance(count_data, list) and count_data
            ):  # Ensure it's a non-empty list
                pushup_count = count_data[0]  # Take the first value
            elif isinstance(count_data, int):  # If it's already an int
                pushup_count = count_data
            else:
                pushup_count = 0  # Default value if it's empty or unexpected

        # Display count on frame
        cv2.putText(
            im0,
            f"squats: {pushup_count}",
            (50, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )

        # Write frame to video
        video_writer.write(im0)

        # Show frame
        cv2.imshow("Workout Tracker", im0)
        print(pushup_count)
        if count != pushup_count:
            count = pushup_count
            await sendMessage(f"rep:{count}", websocket)
            print(f" new value: {count}")
        # **Exit if push-up count reaches 5 or more**
        if pushup_count >= squat:
            print(f"squats goal reached! Exiting... Total squats: {pushup_count}")
            break

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    # Cleanup
    cv2.destroyAllWindows()
    video_writer.release()
    cap.release()

    # Print final push-up count
    print(f"Final squat count: {pushup_count}")
    #!/usr/bin/env python


async def handler(websocket):
    while True:
        try:
            message = await websocket.recv()
            events = json.loads(message)
            for (
                event
            ) in (
                events
            ):  # event might be a json object (you might want to json.loads(event))
                match event["type"]:
                    case "pushup":
                        for i in range(event["set"]):
                            await websocket.send(f"set:{i+1}")
                            await websocket.send(f"time:{event["time"]}")
                            await pushup(
                                event["rep"], event["time"], "pushup", websocket
                            )
                    case "squat":
                        for i in range(int(event["set"])):
                            await websocket.send(f"set:{i+1}")
                            await websocket.send(f"time:{event["time"]}")
                            await squat(event["rep"], event["time"], websocket)
                    case "curls":
                        for i in range(event["set"]):
                            await websocket.send(f"set:{i+1}")
                            await websocket.send(f"time:{event["time"]}")
                            await pushup(
                                event["rep"], event["time"], "curls", websocket
                            )
                    case "close":
                        cv2.destroyAllWindows()
                        video_writer.release()
                        cap.release()
                        await websocket.close()

        except Exception:
            await websocket.close()
            cv2.destroyAllWindows()
            break
        print(message)


async def main():
    async with websockets.serve(handler, "0.0.0.0", 8001) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
