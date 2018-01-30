console.log('content js');
// chrome.tabs.getCurrent(function(tabInfo){
//
//     console.log(tabInfo);
//
//
// });
console.log(chrome.tabs);


chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log('query');
    console.log(tabs[0].url);
});console.log("++++");