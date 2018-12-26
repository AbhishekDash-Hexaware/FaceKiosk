import cv2
import sys
import winsound
import requests 
import base64
import json




def rekognizer(imagedata):

    url = "https://rzxagt9l02.execute-api.us-east-1.amazonaws.com/v1/query"

    headers = {
        'Content-Type': "application/json",
        'cache-control': "no-cache"
        }

    response = requests.request("POST", url, data=json.dumps({"gallery":"tempid_cto_org_dev","image":imagedata}), headers=headers)

    print(response.text)



frequency = 2500  # Set Frequency To 2500 Hertz
duration = 1000  # Set Duration To 1000 ms == 1 second

framecount=0

faceCascade = cv2.CascadeClassifier("D:\PlayGround\kiosk-app\public\haarcascade_frontalface_default.xml")

video_capture = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
            )
    # cv2.CASCADE_SCALE_IMAGE
    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        #Distance filter
        if(w>100):
            framecount+=1
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 355, 0), 2)
            
            if(framecount==30):

                winsound.Beep(frequency, duration)
                # print(frame)
                retval, buffer = cv2.imencode('.jpg', frame)
                base64Image = "data:image/jpeg;base64," + str(base64.b64encode(buffer).decode('utf8'))
                # print(base64Image)
                rekognizer(base64Image)
                # r=requests.get("http://localhost:3000/data")
                # print(r.status_code)

                framecount=0
        else:
            framecount=0


    # Display the resulting frame
    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()


