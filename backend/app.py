from flask import Flask, request, jsonify
from flask_cors import CORS
from services.ingest import build_vector_store
from services.qa import answer_question
import os

app = Flask(__name__)
CORS(app)

VECTOR_STORE = None

@app.route("/upload", methods=["POST"])
def upload_document():
    global VECTOR_STORE

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file or file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    file.save(file_path)

    VECTOR_STORE = build_vector_store(file_path)
    return jsonify({"message": "Document uploaded and indexed successfully"})

@app.route("/ask", methods=["POST"])
def ask_question():
    global VECTOR_STORE
    data = request.get_json(silent=True) or {}
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"error": "Question is required"}), 400

    if VECTOR_STORE is None:
        return jsonify({"error": "Upload a document first"}), 400

    result = answer_question(VECTOR_STORE, question)
    return jsonify({"answer": result})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)
