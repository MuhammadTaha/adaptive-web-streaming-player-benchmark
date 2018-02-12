import {MediaPlayer, Debug} from 'dashjs';
import promise from 'promise';
import Fingerprint2 from 'fingerprintjs2';
import {BenchmarkMetrics,BrowserDetails} from "./BenchmarkMetrics";
import ProgressBar from 'progressbar.js';

// Time to playback start
// Manifest parsing time
// Segment conversion
// CPU load
// Frames per second
// Memory load
// Dropped frames
// Rendered frames


// - sending values from background page to content page

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

let startingTime = Date.now();


let elementTag = document.getElementsByTagName("video");

//auto loop option to the stream
elementTag[0].setAttribute("loop", false);

// Adding Benchmark Button to the player
let divBench = document.createElement("div");

let btnBench = document.createElement("button");
btnBench.type = "button";
btnBench.innerHTML = "Start Benchmarking";
btnBench.className = "btnBenchmark";
btnBench.name = "btnBenchmark";//auto loop option to the stream

divBench.appendChild(btnBench);

// Send Data Button.
let btnSendData = document.createElement("button");
btnSendData.type = "button";
btnSendData.innerHTML = "Send Date";
btnSendData.className = "btnSendDataBenchmark";
btnSendData.name = "btnSendDataBenchmark";//auto loop option to the stream

let divSendData = document.createElement("div");
divSendData.appendChild(btnSendData);

// Adding Progressbar div
let divProgressbar = document.createElement("div");
divProgressbar.id = "progressbar";
divProgressbar.style.cssText = "width: 50%;margin-left: 25%;text-align: right;";

elementTag[0].parentNode.insertBefore(divBench, elementTag[0]);
elementTag[0].parentNode.insertBefore(divSendData, elementTag[0]);
elementTag[0].parentNode.insertBefore(divProgressbar, elementTag[0]);


var bar = new ProgressBar.Line("#progressbar", {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FF8100',
    trailColor: '#eee',
    trailWidth: 2,
    svgStyle: {width: '100%', height: '100%'},
    text: {
        style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            // position: 'absolute',
            right: '0',
            top: '30px',
            padding: 0,
            margin: 0,
            transform: null
        },
        autoStyleContainer: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    step: (state, bar) => {
        bar.setText(Math.round(bar.value() * 100) + ' % Completed');
    }
});

bar.animate(0.0);  // Number from 0.0 to 1.0
bar.set(0.0);

function setProgressValue(barObj,totalCycles, currentCycle,currentStage,totalStages){

    let ans = (currentCycle/totalCycles).toFixed(3);
    // let ans = ((currentCycle/totalCycles)*(currentStage/totalStages)).toFixed(3);

    bar = barObj;
    bar.animate(ans);  // Number from 0.0 to 1.0
    bar.set(ans);
}


let delays = new Array(TEST_COUNT)
let delaysCollection = new Array();
new Fingerprint2().get(function(browserId, components) {
    delaysCollection.push({"browserId": browserId});
});


let delayObj = new BenchmarkMetrics();


function start_benchmark(){
    bar.animate(0.0);  // Number from 0.0 to 1.0
    bar.set(0.0);
    playback_restart();
}



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
    buttonsBenchmark[i].addEventListener('click', start_benchmark, false);
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
let stages=8;

player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {

    // setProgressValue(bar,TEST_COUNT, tag+1,1,stages);

    console.log("Manifest loaded");
    console.log(JSON.stringify(delays));
    // delays[tag][1] = delays[tag][0]-startingTime;

    // delays[tag][1] = Date.now();

    delayObj.manifestLoad = Date.now() - startingTime;
    manifestLoadTime = Date.now();

    console.log("Memory performance");
    console.log(window.performance.memory);
    updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {

    console.log("Stream initialized");
    // setProgressValue(bar,TEST_COUNT, tag+1,2,stages);
    delayObj.streamInitialised = Date.now() - manifestLoadTime;

    // delays[tag].push(Date.now());
    // delays["streamInitialization"].push(Date.now());

    updateMetrics("video", player);
    // console.log(processInfo);
});


player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {
    console.log("Playback started");
    // delays[tag][3] = Date.now();
    // setProgressValue(bar,TEST_COUNT, tag+1,3,stages);
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
    // setProgressValue(bar,TEST_COUNT, tag+1,4,stages);
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
    // setProgressValue(bar,TEST_COUNT, tag+1,5,stages);
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
    // setProgressValue(bar,TEST_COUNT, tag+1,6,stages);
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
    // setProgressValue(bar,TEST_COUNT, tag+1,7,stages);
    delays[tag][7] = Date.now();
    delayObj.playbackSeekingDelay = Date.now() - timeStartSeeking;

});


player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
    console.log("Playback ended");
    // console.log(Date.now());
    setProgressValue(bar,TEST_COUNT, tag+1,8,stages);
    delays[tag][8] = Date.now();

    // delays[tag].push(Date.now());

    console.log("TEST COUNT:" + tag);

    // updateMetrics("video", player);

    if (tag < TEST_COUNT - 1) {
        tag = tag + 1;
        delays[tag][0] = Date.now();
        playback_restart();

    } else {
        player.seek(0);
        player.pause();
        tag = 0;
        send_data();
        // alert("Benchmark completed");
    }
});


function updateMetrics(type, player) {

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
/*    console.log("metrices");
    console.log("Get current track for video");
    console.log(player.getCurrentTrackFor(type));
    console.log("Get Quality current for");
    console.log(player.getQualityFor(type));
    console.log("Get playback rate: ");
    console.log(player.getPlaybackRate());*/
    delayObj.playbackRate = player.getPlaybackRate();
/*
    console.log("Rep Switch : ");
    console.log(repSwitch);
    console.log("Current Dropped Frames:");
    console.log(dashMetrics.getCurrentDroppedFrames(metrics));
    console.log("Buffer stable time:");
    console.log(player.getStableBufferTime());*/
    delayObj.bufferStableTime = player.getStableBufferTime();
    console.log("Buffer level" + bufferLevel + " Index " + index + " DroppedFrames" + droppedFPS);

}


function send_data() {

    var playback_delay_time = "playback_delay_time_";

    // for (var i = 0, len = myStorage.length; i < len; i++) {
    //
    //     var key = myStorage.key(i);
    //     var value = myStorage[key];
    //     console.log("Mystorage Val :" + key + " => " + value);
    //     //console.log(playback_delay_time);
    // }
    //

    const getFingerprint = () => new Promise(resolve => {
        (new Fingerprint2()).get((result, components) => resolve({result, components}))
    });

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
        var url = "http://localhost:4022/metricvalues";
        // var url = "./ams-backend/api/metricvalues";
        // var params = "client_id= " + browserId + " & session_id=" + session_id + "&unit_id=33&value=" + val;
        http.open("POST", url, true);
        // console.log("param:" + params);
        //Send the proper header information along with the request

        //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //http.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        

        // http.setRequestHeader("Content-length", params.length);
        // http.setRequestHeader("Connection", "open");

        // new Fingerprint2().get(function(browserId, components){
        //
        // console.log(browserId); //a hash, representing your device fingerprint
        // console.log(components); // an array of FP components
        //
        // // console.log("Browser ID :" + f.result);
        // BrowserDetails.setBrowserId(browserId);
        // console.log(browserId);
        // delaysCollection[0] = {"browserId" : BrowserDetails.getBrowserId()}

        // delaysCollection.push({"browserId" : browserId});

        // console.log(JSON.stringify(delaysCollection));

            console.log("reached here in finger");

        //     fetch(url, {
        //         method: 'post',
        //         cache: 'no-cache',
        //         // mode: 'no-cors',
        //         headers: {
        //             'content-type': 'application/json',
        //             'accept': 'application/json',
        //             'origin':'*'
        //         },
        //         body: JSON.stringify(delaysCollection)
        //     }).then(res=>console.log(res))
        // .catch(error => console.error('Error:', error));



    // var json = {
    //     json: JSON.stringify({
    //         a: 1,
    //         b: 2
    //     }),
    //     delay: 3
    // };
    //
    // fetch(url, {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'text/plain',
    //         'Content-Type': 'text/plain'
    //     },
    //     body: JSON.stringify(delaysCollection),//'json=' + encodeURIComponent(JSON.stringify(json.json)) + '&delay=' + json.delay
    // })
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (result) {
    //         console.log(result)
    //         alert(result);
    //     })
    //     .catch (function (error) {
    //         console.log('Request failed', error);
    //     });


//     fetch(url, {
//             // mode: 'no-cors',
//             method: 'POST',
//             headers: {
//                 // "Access-Control-Allow-Headers":"Content-Type, Accept",
//                 'Accept': 'text/plain',
//                 'Content-Type': 'text/plain'
//             },
//
//         body: JSON.stringify(delaysCollection),
//     }).then(response => {
//         console.log(response);
//
//
//         if (response.ok) {
//         response.json().then(json => {
//             console.log(json);
//     });
//     }


    // fetch(url, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(delaysCollection)
    // }).then(json).then(res=>res.json())
    //         .then(res => console.log(res));



    // });


        // });

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            console.log("return text:" + http.responseText);
        }
    }


    // console.log(delaysCollection);
    var data = JSON.stringify(delaysCollection);

    // console.log(data);

    http.send(data);




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


