import cv2
import winsound
import base64
import os
from Rekognizer import AwsRekognizer


class FaceTracker:

    face_width=0

    def __init__(self):
        
        FaceTracker.face_width = int(os.getenv('facewidth',100))
        print('Face width',FaceTracker.face_width)


    def tracker(self):

        frequency = 2500  # Set Frequency To 2500 Hertz
        duration = 1000  # Set Duration To 1000 ms == 1 second
        face_frame_count=0
        faceless_frame_count=0
        face_rec_attempt=False

        faceCascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
        ob=AwsRekognizer()
        video_capture = cv2.VideoCapture(0)

        while True:
            # Capture frame-by-frame
            ret, frame = video_capture.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            faces = faceCascade.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=5,minSize=(30, 30),flags=cv2.CASCADE_SCALE_IMAGE)
            # cv2.CASCADE_SCALE_IMAGE
            # Draw a rectangle around the faces
            for (x, y, w, h) in faces:
                # print("faceless",faceless_frame_count)
                #Distance filter
                if(w>FaceTracker.face_width):
                    
                    face_frame_count+=1
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 355, 0), 2)
                    
                    if(face_frame_count==40 ):
                        winsound.Beep(frequency, duration)
                        retval, buffer = cv2.imencode('.jpg', frame)
                        base64Image = "data:image/jpeg;base64," + str(base64.b64encode(buffer).decode('utf8'))
                        # AwsRekognizer.recognize(ob,base64Image)
                        print("took a snap")
                        face_rec_attempt=True
                        face_frame_count=0
                    
                else:

                    face_frame_count=0

            # if(len(faces)==0):
            #     faceless_frame_count+=1

            # if(faceless_frame_count==40 ):
            #         face_rec_attempt=False
            #         faceless_frame_count=0
                # print("ready to take snap")
                # winsound.Beep(frequency, duration)
                    
            
            # Display the resulting frame
            cv2.imshow('Video', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # When everything is done, release the capture
        video_capture.release()
        cv2.destroyAllWindows()



FaceTracker().tracker() 

