import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from flask import Flask,jsonify

app=Flask(__name__)
@app.route("/attendance system")

def resize(image,size):
    width=int(image.shape[1]*size)
    height=int(image.shape[0]*size)
    dimensions=(width,height)
    return cv2.resize(image,dimensions,interpolation=cv2.INTER_AREA)

def mark_attendance(name):
    with open("C:\\Users\\MY HP\\Desktop\\project\\attendance.csv") as f:
        mydatalist=f.readlines()
        namelist=[]
        for line in mydatalist:
            entery=line.split(',')
            namelist.append(entery[0])

        if name not in namelist:
            now=datetime.now()
            timestr=now.strftime('%H:%M')
            f.writelines(f'\n{name},{timestr}')

path="C:\\Users\\MY HP\\Desktop\\project\\students"
images=[]
names=[]
mylist=os.listdir(path)

for stu in mylist:
    current=cv2.imread(f'{path}\{stu}')
    images.append(current)
    names.append(os.path.splitext(stu)[0])
print(names)  

def findencodings(image):
    encoding_list=[]
    for img in image:
        img=resize(img,0.50)
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode_img=face_recognition.face_encodings(img)[0]
        encoding_list.append(encode_img)
    return(encoding_list)

encode_list=findencodings(images)
video=cv2.VideoCapture(0)

while True:
    success,frame=video.read()
    small_frame=cv2.resize(frame,(0,0),None,0.25,0.25)
    small_frame=cv2.cvtColor(small_frame,cv2.COLOR_BGR2RGB)
    face_in_frame=face_recognition.face_locations(small_frame)
    encoding_in_frame=face_recognition.face_encodings(small_frame,face_in_frame)

    for encodeface, facelocation in zip(encoding_in_frame,face_in_frame):
        matching=face_recognition.compare_faces(encode_list,encodeface)
        face_dis=face_recognition.face_distance(encode_list,encodeface)
        print(face_dis)
        match_index=np.argmin(face_dis)

        if matching[match_index]:
            name=names[match_index].upper()
            y1,x2,y2,x1=facelocation
            y1,x2,y2,x1=y1*4,x2*4,y2*4,x1*4
            cv2.rectangle(frame,(x1,y1),(x2,y2),(0,255,0),3)
            cv2.rectangle(frame,(x1,y2-25),(x2,y2),(0,255,0),cv2.FILLED)
            cv2.putText(frame,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
            mark_attendance(name)
    cv2.imshow('video',frame)
    cv2.waitKey(1)

    if __name__=="__main__":
        app.run(debug=True)
        