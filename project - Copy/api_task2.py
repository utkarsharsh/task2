import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from flask import Flask,jsonify
from pathlib import Path

app=Flask(__name__)
@app.route('/')
def attendance():
    base_dir = Path('/home/ananyadix/mysite')
    subfolder_name = 'images'
    path=base_dir / subfolder_name
    images=[]
    names=[]
    mylist=os.listdir(path)

    for stu in mylist:
        current=cv2.imread(f'{path}/{stu}')
        images.append(current)
        names.append(os.path.splitext(stu)[0])

    def findencodings(image):
        encoding_list=[]
        for img in image:
            #img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
            encode_img=face_recognition.face_encodings(img)[0]
            encoding_list.append(encode_img)
        return(encoding_list)

    encode_list=findencodings(images)

    base_dir2 = Path('/home/ananyadix/mysite')
    subfolder_name2 = 'currentimage'
    path2=base_dir2 / subfolder_name2
    current_image=[]
    mylist2=os.listdir(path2)

    for stu2 in mylist2:
        current2=cv2.imread(f'{path2}\{stu2}')
        current_image.append(current2)

    unknown_face_encodings =findencodings(current_image)
    results = face_recognition.compare_faces(encode_list, unknown_face_encodings[0])
    if True in results:
        index = results.index(True)
        recognized_name = names[index]
        return f"Face recognized as {recognized_name}"
    else:
        return "Face not recognized."

if __name__=="__main__":
    app.run(debug=True,port=7000)
