"""Main Flask application."""

from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home() -> Response:
    """Home endpoint."""
    return jsonify({"message": "Hello from Flask backend!"})


@app.route("/api/health")
def health() -> Response:
    """Health check endpoint."""
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
