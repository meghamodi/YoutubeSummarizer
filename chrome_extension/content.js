console.log("YT Summarizer content script loaded on:", window.location.href);
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if (request.message === 'summarize'){
        const videoId= getYouTubeVideoId(window.location.href)    
        if (videoId){
            fetch('http://127.0.0.1:5001/summarize',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({ videoId })
            })
            .then(response=>response.json())
            .then(data=>{
                console.log("Summary:",data.summary)
                sendResponse({ summary: data.summary });
            })
            .catch(error=>{
                console.error('Error',error)
                sendResponse({ error: error.message })}
            );
            
        }else{
            console.error('No videoId found');
            sendResponse({ error: 'No videoId found' });

        }
        return true;
    }
});
function getYouTubeVideoId(url){
    const urlParams = new URL(url);
    return urlParams.searchParams.get("v");

}
   
