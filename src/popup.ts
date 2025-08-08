chrome.tabs.query({currentWindow: true, active:true},(tabs)=>{
    if (tabs[0]?.id){
        chrome.tabs.sendMessage(tabs[0].id,{
            action:'FROM POPUP'
        })
    }
   
})