from openai import OpenAI
from  ytTranscript import extractTranscript
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()
client = OpenAI(
    api_key=os.getenv("APP_CHATAPI_KEY")
)
app=Flask(__name__)
CORS(app)
@app.route("/summarize",methods=["POST","OPTIONS"])

def summarize():
    if request.method == "OPTIONS":
        # Handle preflight request with proper headers
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200

    data = request.get_json()
    video_Id = data.get("videoId")
    if not video_Id:
        return jsonify({"error":"videoId is not valid"}),400
    try:
        transcript = extractTranscript(video_Id)
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": "Summarize the YouTube video with the transcript: " + transcript}
            ]
        )
        summary= response.choices[0].message.content
        result= jsonify({"summary":summary})
        result.headers.add('Access-Control-Allow-Origin', '*')
        return result
    except Exception as e:
        error_result = jsonify({"error": str(e)})
        error_result.headers.add('Access-Control-Allow-Origin', '*')
        return error_result, 500

if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
