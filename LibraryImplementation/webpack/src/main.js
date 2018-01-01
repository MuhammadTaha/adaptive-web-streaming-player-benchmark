chrome.app.runtime.onLaunched.addListener(function() {console.log("tabs")
    chrome.app.window.create('index.html', {
        id: "mainwin",
        innerBounds: {
            height: 550,
            width: 800
        }
    });
    console.log(chrome.tabs);
});

console.log(chrome.tabs);