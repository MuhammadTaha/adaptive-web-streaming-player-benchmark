// chrome.tabs.getCurrent(function(tab){
//         console.log(tab);
//     }
// );
console.log(window.performance.memory);
console.log('main js1');

chrome.tabs.query({currentWindow: false, active: true}, function(tabs){
    console.log('main');
    console.log(tabs);
});

console.log("in main js");
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

let processInfo = null;
chrome.tabs.onActivated.addListener((tab)=>{

    chrome.processes.getProcessIdForTab(tab.tabId, (processId)=>{

        chrome.processes.getProcessInfo(processId,true,(processInfo)=>{
            this.processInfo = processInfo;
            console.log(processInfo);
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


console.log(" main tab");
console.log(chrome.tabs);