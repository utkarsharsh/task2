from flask import Flask, jsonify
import pandas as pd

app=Flask(__name__)
data=pd.read_csv("C:\\Users\\MY HP\\Desktop\\project\\attendance.csv")
@app.route("/api/collected-data",methods=["GET"])
def attend():
    data_json=data.to_json(orient="records")
    return jsonify({"data":data_json})
if __name__=="__main__":
    app.run(debug=True)
