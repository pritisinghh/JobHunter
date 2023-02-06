from flask import Flask, request, Response
import json
import os
from dotenv import load_dotenv
import ner
import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download("punkt")
nltk.download("popular")

load_dotenv()
app = Flask(__name__)


@app.route("/")
def hello():
    print("...from backend server")
    return "<p>Hello, World!</p>"


@app.route("/processmails", methods=["POST", "GET"])
def process():
    try:
        decoded_data = request.data.decode("utf-8")
        mail_content = json.loads(decoded_data)
        print(mail_content)
        output = ner.do_ner(mail_content)
        return Response(json.dumps(output))

    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return Response(json.dumps({"error": str(err)}))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("MAILREADER_PORT")), debug=True)
