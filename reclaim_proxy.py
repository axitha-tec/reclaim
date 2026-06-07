from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import requests

app = Flask(__name__)
CORS(app)

BUCKET = "aw-watcher-window_DESKTOP-FM6JR2N"

@app.route("/api/window-events")
def window_events():
    date = request.args.get("date")

    if not date:
        date = datetime.now().strftime("%Y-%m-%d")

    start = f"{date}T00:00:00"
    end = f"{date}T23:59:59"

    url = f"http://localhost:5600/api/0/buckets/{BUCKET}/events"
    params = {
        "start": start,
        "end": end
    }

    response = requests.get(url, params=params)
    data = response.json()

    return jsonify(data)

@app.route("/api/buckets")
def buckets():
    data = requests.get("http://localhost:5600/api/0/buckets/").json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001, debug=True)