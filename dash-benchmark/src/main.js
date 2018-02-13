
let processInfo = null;

chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
console.log("tab updated ");
    chrome.processes.getProcessIdForTab(tabId, (processId)=>{

        chrome.processes.getProcessInfo(processId,true,(processInfo)=> {
            if(processInfo != null){
            this.processInfo = processInfo;
            console.log(processInfo);

            chrome.tabs.sendMessage(tabId, {processInfo: processInfo}, function (response) {
                 if (response.farewell != undefined) {
                    console.log(response.farewell);
                }
            });
        }
        });

    });

});

chrome.tabs.onActivated.addListener((tab)=>{
    console.log("tab activated ");
chrome.processes.getProcessIdForTab(tab.tabId, (processId)=>{

    chrome.processes.getProcessInfo(processId,true,(processInfo)=> {
        if(processInfo != null){
        this.processInfo = processInfo;
        console.log(processInfo);

        chrome.tabs.sendMessage(tab.tabId, {processInfo: processInfo}, function (response) {
            if (response.farewell != undefined) {
                console.log(response.farewell);
            }
        });
    }
    });

});

});
