document.getElementById('summarize').addEventListener('click',()=>{
    const output = document.getElementById('output');
    output.textContent = 'Loading...';
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{message:'summarize'},
            function(response){
                
                if (chrome.runtime.lastError) {
                    output.textContent = 'Error: ' + chrome.runtime.lastError.message;
                    return;
                  }
                  if (response && response.summary) {
                    output.textContent = response.summary;
                  } else {
                    output.textContent = 'No summary received.';
                  }
            }
        );
    })
})