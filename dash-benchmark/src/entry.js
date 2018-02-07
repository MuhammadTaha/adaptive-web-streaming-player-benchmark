import {MediaPlayer, Debug} from 'dashjs';
import promise from 'promise';
import Fingerprint2 from 'fingerprintjs2';
import {BenchmarkMetrics} from "./BenchmarkMetrics";

// Time to playback start
// Manifest parsing time
// Segment conversion
// CPU load
// Frames per second
// Memory load
// Dropped frames
// Rendered frames


// - sending values from background page to content page
// - session collection (using session id from nodejs)
// - collecting and organising the values collected
// - saving to local or sending them to api


//- saving values in array and then creating difference in values to display in graph

let TEST_COUNT = 3;
let tag = 0;
let METRICES_COUNT = 9;

let myStorage = window.localStorage;
let storage_item_menifest_load = "manifest_load_time_";
let storage_item_playback_delay = "playback_delay_time_";
let processInfo = '';


// Initializing Player
// let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
let url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#dashPlayer'), url, false);
let playerStarted = Date.now();
player.getDebug().setLogToBrowserConsole(false);

// Adding Button to the player


let startingTime = Date.now();

//initialising local web storage


// Adding Benchmark Button to the player
let elementTag = document.getElementsByTagName("video");

//auto loop option to the stream
elementTag[0].setAttribute("loop", false);

let divBench = document.createElement("div");

let btnBench = document.createElement("button");
btnBench.type = "button";
btnBench.innerHTML = "Start Benchmarking";
btnBench.className = "btnBenchmark";
btnBench.name = "btnBenchmark";//auto loop option to the stream

divBench.appendChild(btnBench);

elementTag[0].parentNode.insertBefore(divBench, elementTag[0]);


// Send Data Button.
let divSendData = document.createElement("div");

let btnSendData = document.createElement("button");
btnSendData.type = "button";
btnSendData.innerHTML = "Send Date";
btnSendData.className = "btnSendDataBenchmark";
btnSendData.name = "btnSendDataBenchmark";//auto loop option to the stream


divSendData.appendChild(btnSendData);

elementTag[0].parentNode.insertBefore(divSendData, elementTag[0]);



let delays = new Array(TEST_COUNT)
let delaysCollection = new Array();
let delayObj = new BenchmarkMetrics();


function playback_restart() {
    // for restarting the stream
    player.seek(0);

    startingTime = Date.now();
    delaysCollection.push(delayObj);
    console.log(JSON.stringify(delaysCollection));

    delayObj= new BenchmarkMetrics();
    player.play();
}

let buttonsBenchmark = document.getElementsByClassName("btnBenchmark");
let buttonsSendData = document.getElementsByClassName("btnSendDataBenchmark");

for (var i = 0; i < buttonsBenchmark.length; i++) {
    buttonsBenchmark[i].addEventListener('click', playback_restart, false);
}

for (var i = 0; i < buttonsSendData.length; i++) {
    buttonsSendData[i].addEventListener('click', send_data, false);
}




for (i = 0; i < TEST_COUNT; i++) {
    delays[i] = new Array(METRICES_COUNT);
}

console.log("setting here");
if (delays[0]) {
    delays[0][0] = Date.now();
}
let manifestLoadTime = 0;
player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {

    // var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    // console.log(document.cookie['io']);

    console.log("Manifest loaded");
    console.log(JSON.stringify(delays));
    // delays[tag][1] = delays[tag][0]-startingTime;

    // delays[tag][1] = Date.now();

    delayObj.manifestLoad = startingTime - Date.now();
    manifestLoadTime = Date.now();

    //storage_item_menifest_load=storage_item_menifest_load+tag;
    //myStorage.setItem(storage_item_menifest_load,(Date.now()-startingTime));
    //storage_item_menifest_load="menifest_load_time_";

    // delays["manifestLoaded"].push(Date.now() - startingTime);
    // delays[tag].push(Date.now() - startingTime);
    // delay1.push(Date.now() - startingTime);
    // console.log(delays)
    console.log("Memory performance");
    console.log(window.performance.memory);
    // updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {

    console.log("Stream initialized");
    // delays[tag][2] = Date.now();

    delayObj.streamInitialised = Date.now() -manifestLoadTime;

    // delays[tag].push(Date.now());
    // delays["streamInitialization"].push(Date.now());

    updateMetrics("video", player);
    // console.log(processInfo);

});


player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {
    console.log("Playback started");
    // delays[tag][3] = Date.now();

    delayObj.playbackStartDelay = Date.now() - manifestLoadTime;

    //console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);

    console.log("stream info");
    console.log(player.getActiveStream().getStreamInfo());
    // updateMetrics("video", player);
});

let timeStart=0;
let timeStartSeeking=0;
player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
    // delays["qualityChangeRequested"].push(Date.now());
    // delays[tag].push(Date.now());

    // console.log(Date.now());
    delays[tag][4] = Date.now();

    timeStart = Date.now();


    console.log("Memory performance");
    console.log(window.performance.memory);

    console.log("Quality change rendered");
    updateMetrics("video", player);

});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
    // delays["qualityChangeRendered"].push(Date.now());
    // delays[tag].push(Date.now());
    delays[tag][5] = Date.now();

    delayObj.qualityChangeDelay = Date.now() - timeStart;

    // console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);
    console.log("Quality change rendered");
    updateMetrics("video", player);
    // console.log(processInfo);
});

player.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKING, function (e) {
    // delays["qualityChangeRendered"].push(Date.now());
    // delays[tag].push(Date.now());
    delays[tag][6] = Date.now();

    timeStartSeeking =  Date.now();
    // console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);
    console.log("Quality change rendered");
    updateMetrics("video", player);
    // console.log(processInfo);
});

player.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKED, function (e) {
    // delays["qualityChangeRendered"].push(Date.now());
    // delays[tag].push(Date.now());
    delays[tag][7] = Date.now();
    delayObj.playbackSeekingDelay = Date.now() - timeStartSeeking;

});


player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
    console.log("Playback ended");
    // console.log(Date.now());
    delays[tag][8] = Date.now();

    // delays[tag].push(Date.now());

    console.log("TEST COUNT:" + tag);

    // updateMetrics("video", player);

    if (tag < TEST_COUNT - 1) {
        console.log(JSON.stringify(delays));
        tag = tag + 1;
        console.log(tag);
        delays[tag][0] = Date.now();
        playback_restart();
    } else {
        player.seek(0);
        player.pause();
        alert("Benchmark completed");
        // console.log(JSON.stringify(delays));
        tag = 0;
        send_data();
    }
});


function updateMetrics(type, player) {

    console.log("in function");
    var metrics = player.getMetricsFor(type);
    var dashMetrics = player.getDashMetrics();

    // if (metrics && dashMetrics && $scope.streamInfo) {
    //     if (metrics && dashMetrics ) {

    // var periodIdx = $scope.streamInfo.index;
    var repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
    var bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);

    delayObj.bufferLevel.push(bufferLevel);


    // var maxIndex = dashMetrics.getMaxIndexForBufferType(type, periodIdx);
    var index = player.getQualityFor(type);
    // var bitrate = repSwitch ? Math.round(dashMetrics.getBandwidthForRepresentation(repSwitch.to, periodIdx) / 1000) : NaN;
    var droppedFPS = dashMetrics.getCurrentDroppedFrames(metrics) ? dashMetrics.getCurrentDroppedFrames(metrics).droppedFrames : 0;
    delayObj.droppedFrames = droppedFPS;
    console.log("metrices");
    console.log("Get current track for video");
    console.log(player.getCurrentTrackFor(type));
    console.log("Get Quality current for");
    console.log(player.getQualityFor(type));
    console.log("Get playback rate: ");
    console.log(player.getPlaybackRate());
    delayObj.playbackRate = player.getPlaybackRate();

    console.log("Rep Switch : ");
    console.log(repSwitch);
    console.log("Current Dropped Frames:");
    console.log(dashMetrics.getCurrentDroppedFrames(metrics));
    console.log("Buffer stable time:");
    console.log(player.getStableBufferTime());
    delayObj.bufferStableTime = player.getStableBufferTime();
    console.log("Buffer level" + bufferLevel + " Index " + index + " DroppedFrames" + droppedFPS);

}


function send_data() {

    //console.log(" Menifest Delays: ");
    // console.log(JSON.stringify(delays));
    var playback_delay_time = "playback_delay_time_";


    // for (var i = 0, len = myStorage.length; i < len; i++) {
    //
    //     var key = myStorage.key(i);
    //     var value = myStorage[key];
    //     console.log("Mystorage Val :" + key + " => " + value);
    //     //console.log(playback_delay_time);
    // }

    var browserId;
    //
    const getFingerprint = () => new Promise(resolve => {
        (new Fingerprint2()).get((result, components) => resolve({result, components}))
    })


    // setTimeout(main, 0);
    //
    //
    // console.log("Final Browser ID :" + browserId);

    var t;
    var session_id = new Date().valueOf();

    console.log("Final Session ID :" + session_id);

    // for (var test = 1, t = myStorage.getItem("TEST_COUNT"); test < t; test++) {

        //playback_delay_time = playback_delay_time + i;
        //console.log("String Before Matched:"+playback_delay_time);
        // playback_delay_time = playback_delay_time + test;
        // var val = myStorage.getItem(playback_delay_time);
        //
        // console.log(":" + playback_delay_time);

        var http = new XMLHttpRequest();

        //console.log("String Matched:"+playback_delay_time);
        var url = "http://localhost:3002/playback_delay";
        // var params = "client_id= " + browserId + " & session_id=" + session_id + "&unit_id=33&value=" + val;
        http.open("POST", url, true);
        // console.log("param:" + params);
        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }




    // const main = async() => {
        // pseudo-synchronous code
        // const f = await getFingerprint()
        //btnBenchmark.innerText = f.result

    new Fingerprint2().get(function(result, components){

        console.log(result); //a hash, representing your device fingerprint
        console.log(components); // an array of FP components


        // console.log("Browser ID :" + f.result);
        browserId = result
        delaysCollection.push(browserId);

        console.log(JSON.stringify(delaysCollection));

    });



        // http.send(JSON.stringify(delaysCollection));

    // }




    // }

    //localStorage.getItem("bar");

    // myStorage.clear();
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("receive message");
        console.log(request.processInfo);
        // if (request.processInfo) {
        this.processInfo = request.processInfo;
        console.log('send goodbye');
        sendResponse({farewell: "goodbye"});

        // }
});


// import {MediaPlayer, Debug} from 'dashjs';
//
//
// // Time to playback start
// // Manifest parsing time
// // Segment conversion
// // CPU load
// // Frames per second
// // Memory load
// // Dropped frames
// // Rendered frames
//
//
// // - sending values from background page to content page
// // - session collection (using session id from nodejs)
// // - collecting and organising the values collected
// // - saving to local or sending them to api
//
//
// //- saving values in array and then creating difference in values to display in graph
//
// let TEST_COUNT = 3;
// let tag = 1;
// let startingTime = 0;
// let myStorage = window.localStorage;
// let storage_item_menifest_load = "manifest_load_time_";
// let storage_item_playback_delay = "playback_delay_time_";
// let processInfo = '';
//
//
// // Initializing Player
// let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
// // let url =   "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" ;
// let player = dashjs.MediaPlayer().create();
// player.initialize(document.querySelector('#dashPlayer'), url, false);
// player.getDebug().setLogToBrowserConsole(false);
// player.setAutoPlay(false);
//
// startingTime = Date.now();
//
// // let el_body = document.getElementsByTagName("body");
// //
// // let event = new CustomEvent("onActivated", {bubbles: true, cancelable: true});
//
//
//
// //initialising local web storage
//
//
// // Adding Benchmark Button to the player
// let elementTag = document.getElementsByTagName("video");
//
// //auto loop option to the stream
// elementTag[0].setAttribute("loop", false);
//
//
// let divBench = document.createElement("div");
//
// let btnBench = document.createElement("button");
// btnBench.type = "button";
// btnBench.innerHTML = "Start Benchmarking";
// btnBench.className = "btnBenchmark";
// btnBench.name = "btnBenchmark";//auto loop option to the stream
// btnBench.setAttribute("onclick", "playback_restart()");
//
// divBench.appendChild(btnBench);
//
//
// // Send Data Button.
// let divSendData = document.createElement("div");
//
// let btnSendData = document.createElement("button");
// btnSendData.type = "button";
// btnSendData.innerHTML = "Send Data";
// btnSendData.className = "btnSendDataBenchmark";
// btnSendData.name = "btnSendDataBenchmark";//auto loop option to the stream
//
//
// btnSendData.setAttribute("onclick", "send_data()");
// divSendData.appendChild(btnSendData);
//
//
// let buttonsBenchmark = document.getElementsByClassName("btnBenchmark");
// console.log(buttonsBenchmark);
//
// let buttonsSendData = document.getElementsByClassName("btnSendDataBenchmark");
// console.log(buttonsSendData);
//
//
// // let btnBenchmark = document.createElement("button");
// // btnBenchmark.innerText= "Start Benchmarking";
// elementTag[0].parentNode.insertBefore(divBench,elementTag[0]);
//
//
// // let btnsendAPIdata = document.createElement("button");
// // btnsendAPIdata.innerText= "Send Data";
// elementTag[0].parentNode.insertBefore(divSendData,elementTag[0]);
//
//
//
// for (var i = 0; i < buttonsBenchmark.length; i++) {
//     buttonsBenchmark[i].addEventListener('click', playback_restart(), false);
// }
// console.log(player.getLiveDelay());
//
//
// for (var i = 0; i < buttonsSendData.length; i++) {
//     buttonsSendData[i].addEventListener('click', send_data(), false);
//
// }
//
// // let el_body = document.getElementsByTagName('body')
// // var event = new Event(chrome.tabs.onActivated);  // (*)
// // el_body.dispatchEvent(event);
// // HTMLElement el_body = document.getElementsByTagName('body');
//
// function playback_restart() {
//     // for restarting the stream
//     player.seek(0);
//     player.play();
//
//     // el_body .dispatchEvent(event);
// }
//
//
//
// let delays = [];
// delays["manifestLoaded"] = [];
// delays["streamInitialization"] = [];
// delays["playbackStarted"] = [];
// delays["playbackEnded"] = [];
// delays["qualityChangeRequested"] = [];
// delays["qualityChangeRendered"] = [];
// delays["qualityChangeRendered"] = [];
//
//
// player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {
//
//     // var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
//     // console.log(document.cookie['io']);
//
//     console.log("Manifest loaded");
//     console.log(Date.now());
//
//     //storage_item_menifest_load=storage_item_menifest_load+tag;
//     //myStorage.setItem(storage_item_menifest_load,(Date.now()-startingTime));
//     //storage_item_menifest_load="menifest_load_time_";
//
//     delays["manifestLoaded"].push(Date.now() - startingTime);
//     console.log(delays);
//
//     console.log("Memory performance");
//     console.log(window.performance.memory);
//     // updateMetrics("video", player);
// });
// player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {
//
//
//     console.log("Stream initialized");
//     //console.log(Date.now());
//
//     delays["streamInitialization"].push(Date.now());
//
//     updateMetrics("video", player);
//     // console.log(processInfo);
//
// });
//
//
// player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {
//     console.log("Playback started");
//     console.log(Date.now());
//     console.log("Memory performance");
//     console.log(window.performance.memory);
//
//     storage_item_playback_delay = storage_item_playback_delay + tag;
//     myStorage.setItem(storage_item_playback_delay, (Date.now() - startingTime));
//     storage_item_playback_delay = "playback_delay_time_";
//     myStorage.setItem("TEST_COUNT", tag);
//
//     delays["playbackStarted"].push(Date.now());
//     console.log("stream info");
//     console.log(player.getActiveStream().getStreamInfo());
//     // updateMetrics("video", player);
// });
//
//
// player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
//     delays["qualityChangeRequested"].push(Date.now());
//
//     console.log(Date.now());
//     console.log("Memory performance");
//     console.log(window.performance.memory);
//
//     console.log("Quality change rendered");
//     updateMetrics("video", player);
//
// });
//
//
// player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
//     delays["qualityChangeRendered"].push(Date.now());
//
//     // console.log(Date.now());
//     console.log("Memory performance");
//     console.log(window.performance.memory);
//     console.log("Quality change rendered");
//     updateMetrics("video", player);
//     // console.log(processInfo);
// });
//
// player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
//     console.log("Playback ended");
//     console.log(Date.now());
//     delays["playbackEnded"].push(Date.now());
//
//     console.log("TEST_COUNT:" + TEST_COUNT);
//
//     // updateMetrics("video", player);
//
//     if (TEST_COUNT > 0) {
//         console.log(TEST_COUNT);
//         tag = tag + 1;
//         TEST_COUNT = TEST_COUNT - 1;
//         playback_restart();
//     }
//     else {
//         alert("Benchmark completed");
//     }
// });
//
//
// function updateMetrics(type, player) {
//     console.log("in function");
//     var metrics = player.getMetricsFor(type);
//     var dashMetrics = player.getDashMetrics();
//
//     // if (metrics && dashMetrics && $scope.streamInfo) {
//     //     if (metrics && dashMetrics ) {
//
//     // var periodIdx = $scope.streamInfo.index;
//     var repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
//     var bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
//     // var maxIndex = dashMetrics.getMaxIndexForBufferType(type, periodIdx);
//     var index = player.getQualityFor(type);
//     // var bitrate = repSwitch ? Math.round(dashMetrics.getBandwidthForRepresentation(repSwitch.to, periodIdx) / 1000) : NaN;
//     var droppedFPS = dashMetrics.getCurrentDroppedFrames(metrics) ? dashMetrics.getCurrentDroppedFrames(metrics).droppedFrames : 0;
//
//     console.log("metrices");
//     console.log("Get current track for video");
//     console.log(player.getCurrentTrackFor(type));
//     console.log("Get Quality current for");
//     console.log(player.getQualityFor(type));
//     console.log("Get playback rate: ");
//     console.log(player.getPlaybackRate());
//     console.log("Rep Switch : ");
//     console.log(repSwitch);
//     console.log("Current Dropped Frames:");
//     console.log(dashMetrics.getCurrentDroppedFrames(metrics));
//     console.log("Buffer stable time:");
//     console.log(player.getStableBufferTime());
//     console.log("Buffer level" + bufferLevel + " Index " + index + " DroppedFrames" + droppedFPS);
//
// }
//
// function send_data() {
//
//     //console.log(" Menifest Delays: ");
//     //console.log(delays["manifestDelay"]);
//     var playback_delay_time = "playback_delay_time_";
//
//
//     for (var i = 0, len = myStorage.length; i < len; i++) {
//
//         var key = myStorage.key(i);
//         var value = myStorage[key];
//         console.log("Mystorage Val :" + key + " => " + value);
//         //console.log(playback_delay_time);
//     }
//
//     var t;
//     for (var test = 1, t = myStorage.getItem("TEST_COUNT"); test < t; test++) {
//         //playback_delay_time = playback_delay_time + i;
//         //console.log("String Before Matched:"+playback_delay_time);
//         playback_delay_time = playback_delay_time + test;
//         var val = myStorage.getItem(playback_delay_time);
//         console.log(":" + playback_delay_time);
//         var http = new XMLHttpRequest();
//
//         //console.log("String Matched:"+playback_delay_time);
//         var url = "http://localhost:3002/playback_delay";
//         var params = "client_id=1&session_id=" + test + "&unit_id=33&value=" + val;
//         http.open("POST", url, true);
//         console.log("param:" + params);
//         //Send the proper header information along with the request
//         http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         http.setRequestHeader("Content-length", params.length);
//         http.setRequestHeader("Connection", "close");
//
//         http.onreadystatechange = function () {//Call a function when the state changes.
//             if (http.readyState == 4 && http.status == 200) {
//                 alert(http.responseText);
//             }
//         }
//         http.send(params);
//
//         playback_delay_time = "playback_delay_time_";
//
//     }
//
//
//     //localStorage.getItem("bar");
//
//     myStorage.clear();
// }
//
//
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log("receive message");
//         console.log(request.processInfo);
//         // if (request.processInfo) {
//         this.processInfo = request.processInfo;
//         console.log('send goodbye');
//         sendResponse({farewell: "goodbye"});
//
//         // }
//     });
