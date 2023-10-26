import cv2
import numpy as np
import face_recognition

def resize(image,size):
    width=int(image.shape[1]*size)
    height=int(image.shape[0]*size)
    dimensions=(width,height)
    return cv2.resize(image,dimensions,interpolation=cv2.INTER_AREA)

img=face_recognition.load_image_file("C:\\Users\\MY HP\\Desktop\\project\\bill gates 1.jpg")
img_test=face_recognition.load_image_file("C:\\Users\\MY HP\\Desktop\\project\\bill gates 2.jpg")
img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
img_test=cv2.cvtColor(img_test,cv2.COLOR_BGR2RGB)
resize(img,0.50)
resize(img_test,0.50)

faceloc_img=face_recognition.face_locations(img)[0]
encode_img=face_recognition.face_encodings(img)[0]
cv2.rectangle(img,(faceloc_img[3],faceloc_img[0]),(faceloc_img[2],faceloc_img[1]),(255,0,255),2)

faceloc_img_test=face_recognition.face_locations(img_test)[0]
encode_img_test=face_recognition.face_encodings(img_test)[0]
cv2.rectangle(img_test,(faceloc_img_test[3],faceloc_img_test[0]),(faceloc_img_test[2],faceloc_img_test[1]),(255,0,255),2)

img_encode=face_recognition.face_encodings(img)[0]
img_test_encode=face_recognition.face_encodings(img_test)[0]

result=face_recognition.compare_faces([img_encode],img_test_encode)
print(result)
cv2.putText(img_test,f'{result}',(50,50),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,255),2)

cv2.imshow("main_img",img)
cv2.imshow("test_img",img_test)
cv2.waitKey(0)
cv2.destroyAllWindows()