from youtube_transcript_api import YouTubeTranscriptApi


def extractTranscript(vId):

    ytt_api = YouTubeTranscriptApi()
    
    fetched_transcript=ytt_api.fetch(video_id=vId)
    
    transcript = ''.join(snippet.text for snippet in fetched_transcript)
    return transcript