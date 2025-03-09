import cv2
from ultralytics import YOLO, solutions
#import winsound
import time
import easygui
# Load video
#cap = cv2.VideoCapture(r"C:\Users\lufai\Pictures\Camera Roll/file5.mp4")

def pushup(push, t):
    #winsound.PlaySound('bip.wav', winsound.SND_FILENAME)
    time.sleep(t)
    #winsound.PlaySound('bip.wav', winsound.SND_FILENAME)

    # Load video
    cap = cv2.VideoCapture(0)
    assert cap.isOpened(), "Error reading video file"
    w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))

    # Load YOLO pose model
    #model = YOLO("yolo11n-pose.pt")

    # Video writer
    video_writer = cv2.VideoWriter("workouts.avi", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h))

    # Init AIGym for push-up tracking
    pushup_tracker = solutions.AIGym(
        line_thickness=2,
        view_img=True,
        pose_type="pushup",
        kpts_to_check=[6, 8, 10]
    )

    pushup_count = 0  # Initialize push-up count
    count=0
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
            if isinstance(count_data, list) and count_data:  # Ensure it's a non-empty list
                pushup_count = count_data[0]  # Take the first value
            elif isinstance(count_data, int):  # If it's already an int
                pushup_count = count_data
            else:
                pushup_count = 0  # Default value if it's empty or unexpected

        # Display count on frame
        cv2.putText(im0, f"Push-Ups: {pushup_count}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Write frame to video
        video_writer.write(im0)

        # Show frame
        cv2.imshow("Workout Tracker", im0)
        print(pushup_count)
        if (count != pushup_count):
            count = pushup_count
            print(f" __New Value__ {count}")

        # **Exit if push-up count reaches 5 or more**
        if pushup_count >= push:
            print(f"Push-up goal reached! Exiting... Total push-ups: {pushup_count}")
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cv2.destroyAllWindows()
    video_writer.release()
    cap.release()

    # Print final push-up count
    print(f"Final push-up count: {pushup_count}")


def squat(squat,t):
    #winsound.PlaySound('bip.wav', winsound.SND_FILENAME)
    time.sleep(t)
    #winsound.PlaySound('bip.wav', winsound.SND_FILENAME)

    # Load video
    cap = cv2.VideoCapture(0)
    assert cap.isOpened(), "Error reading video file"
    w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))

    # Video writer
    video_writer = cv2.VideoWriter("workouts.avi", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h))

    # Init AIGym for push-up tracking
    squat_tracker = solutions.AIGym(
        line_thickness=2,
        view_img=True,
        pose_type="squat",
        kpts=[12,14,16]
    )

    pushup_count = 0  # Initialize squat count
    count = 0
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
            if isinstance(count_data, list) and count_data:  # Ensure it's a non-empty list
                pushup_count = count_data[0]  # Take the first value
            elif isinstance(count_data, int):  # If it's already an int
                pushup_count = count_data
            else:
                pushup_count = 0  # Default value if it's empty or unexpected

        # Display count on frame
        cv2.putText(im0, f"squats: {pushup_count}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Write frame to video
        video_writer.write(im0)

        # Show frame
        cv2.imshow("Workout Tracker", im0)
        print(pushup_count)
        if(count!=pushup_count):
            count = pushup_count
            print(f" new value: {count}")
        # **Exit if push-up count reaches 5 or more**
        if pushup_count >= squat:
            print(f"squats goal reached! Exiting... Total squats: {pushup_count}")
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cv2.destroyAllWindows()
    video_writer.release()
    cap.release()

    # Print final push-up count
    print(f"Final squat count: {pushup_count}")



push = easygui.enterbox("How many pushups?")
time1 = 0

squats = easygui.enterbox("How many squats?")
time2 = easygui.enterbox("How much time before the workout(sec)?")
pushup(int(push), int(time1))
squat(int(squats),int(time2))
