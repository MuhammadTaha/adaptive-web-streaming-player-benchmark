// chrome.tabs.getCurrent(function(tab){
//         console.log(tab);
//     }
// );


console.log(window.performance.memory);
console.log('main js1');

// chrome.tabs.query({currentWindow: false, active: true}, function(tabs){
//     console.log('main');
//     console.log(tabs);
// });

// console.log("in main js");
// chrome.app.runtime.onLaunched.addListener(function() {console.log("tabs")
//     console.log("onLaunch");
//     chrome.app.window.create('index.html', {
//         id: "mainwin",
//         innerBounds: {
//             height: 550,
//             width: 800
//         }
//     });
//
//
//
//     chrome.windows.getAll({ populate: true }, function(windowList) {
//         tabs = {};
//         tabIds = [];
//         for (var i = 0; i < windowList.length; i++) {
//             windowList[i].current = (windowList[i].id == currentWindowId);
//             windowList[i].focused = (windowList[i].id == focusedWindowId);
//             for (var j = 0; j < windowList[i].tabs.length; j++) {
//                 tabIds[tabIds.length] = windowList[i].tabs[j].id;
//                 tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j];
//             }
//         }
//
//
//         console.log(windowList);
//         // var input = new JsExprContext(windowList);
//         // var output = document.getElementById('windowList');
//         // jstProcess(input, output);
//     });
// });

// var port = chrome.runtime.connect();
// console.log(port);


let processInfo = null;
chrome.tabs.onActivated.addListener((tab)=>{
console.log("tab activated ");
    chrome.processes.getProcessIdForTab(tab.tabId, (processId)=>{

        chrome.processes.getProcessInfo(processId,true,(processInfo)=> {
            if(processInfo != null){
            this.processInfo = processInfo;
            console.log(processInfo);

            chrome.tabs.sendMessage(tab.tabId, {processInfo: processInfo}, function (response) {
                // if (response.farewell) {
                    console.log(response.farewell);
                // }
            });
        }
        });

    });

});



// const EventEmitter = require('events');
//
// class MyEmitter extends EventEmitter {}
//
// const myEmitter = new MyEmitter();
// // myEmitter.on('chrome.tabs.onActivated', () => {
// //     console.log('an event occurred!');
// // });
// myEmitter.emit('chrome.tabs.onActivated');
//
// chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
// });
console.log(" main tab");
console.log(chrome.tabs);