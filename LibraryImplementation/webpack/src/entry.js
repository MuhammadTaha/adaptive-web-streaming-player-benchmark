import {MediaPlayer, Debug} from 'dashjs';


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

let TEST_COUNT = 40;
let startingTime = 0;



// Initializing Player
//let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
let url =   "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" ;
let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#dashPlayer'), url, false);

startingTime = Date.now();

//initialising local web storage
let myStorage = window.localStorage;

// Adding Button to the player
let elementTag = document.getElementsByTagName("video");

let divBench = document.createElement("div");

let btnBench = document.createElement("button");
btnBench.type="button";
btnBench.innerHTML="Start Benchmarking";
btnBench.className = "btnBenchmark";
btnBench.name= "btnBenchmark";//auto loop option to the stream

//auto loop option to the stream
elementTag[0].setAttribute("loop",true);


console.log(elementTag);
elementTag[0].setAttribute("loop",true);"btnBenchmark";

btnBench.setAttribute("onclick","playback_restart()");

divBench.appendChild(btnBench) ;

let btnBenchmark = document.createElement("button");
btnBenchmark.innerText= "Start Benchmarking";

elementTag[0].parentNode.insertBefore(divBench,elementTag[0]);

 let buttonsBenchmark = document.getElementsByClassName("btnBenchmark");
 console.log(buttonsBenchmark);

 function playback_restart(){
     // for restarting the stream
     player.seek(0);

     player.play();
 }



for (var i = 0; i < buttonsBenchmark.length; i++) {
    buttonsBenchmark[i].addEventListener('click', playback_restart, false);

}


console.log(player.getLiveDelay());
// console.log("matewete");
// player.on("click", function (e) {
//     alert("player clicked");
// });


// let systemInfo = chrome.system;

// player.getMetricsFor(type)
// updateMetrics("video",player);

let delays = [];
delays["manifestDelay"]=[];
delays["streamInitializationDelay"]=[];


player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {

    // var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    // console.log(document.cookie['io']);

    console.log("Manifest loaded");
    console.log(Date.now());


    myStorage.setItem("manifest_loaded",Date.now());

    delays["manifestDelay"].push(Date.now()-startingTime);
    console.log(delays);

    console.log("Memory performance");
    console.log(window.performance.memory);
    // updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {


    console.log("Stream initialized");
    console.log(Date.now());

    delays["streamInitializationDelay"].push();

    updateMetrics("video", player);
    // console.log(processInfo);

});

player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {


    console.log("Stream initialized");
    console.log(Date.now());
    updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {
    console.log("Playback started");
    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);

    console.log("stream info");
    console.log(player.getActiveStream().getStreamInfo());
    // updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
    console.log("Playback ended");
    console.log(Date.now());
    // updateMetrics("video", player);

    if (TEST_COUNT > 0){
    player.seek(0);
    }
    else {
        player.seek(0);
        player.play();
    }

});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);

    console.log("Quality change rendered");
    updateMetrics("video", player);

});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);
    console.log("Quality change rendered");
    updateMetrics("video", player);
    console.log(processInfo);


});


// player.on(dashjs.MediaPlayer.events.Qua, function (e) {
//     console.log(Date.now());
//     console.log("Quality change rendered");
//     updateMetrics("video", player);
//
// });


// player.on(dashjs.MediaPlayer.events.S, function (e) {
//     console.log("Quality change rendered");
//     updateMetrics("video",player);
// });
// while(true) {
//     console.log(player.getInitialBitrateFor());
// console.log(player.getBandwidthForRepresentation('video'));
// console.log(player.getDashMetrics());
//
// console.log(player.getQualityFor("video"));
// console.log(player.getMetricsFor("video"));
// console.log(player.getMetricsFor("audio"));
//
// console.log(player.getStableBufferTime());
// console.log("here");
// console.log(player.getBufferLength());


function updateMetrics(type, player) {
    console.log("in function");
    var metrics = player.getMetricsFor(type);
    var dashMetrics = player.getDashMetrics();

    // if (metrics && dashMetrics && $scope.streamInfo) {
    //     if (metrics && dashMetrics ) {

    // var periodIdx = $scope.streamInfo.index;
    var repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
    var bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
    // var maxIndex = dashMetrics.getMaxIndexForBufferType(type, periodIdx);
    var index = player.getQualityFor(type);
    // var bitrate = repSwitch ? Math.round(dashMetrics.getBandwidthForRepresentation(repSwitch.to, periodIdx) / 1000) : NaN;
    var droppedFPS = dashMetrics.getCurrentDroppedFrames(metrics) ? dashMetrics.getCurrentDroppedFrames(metrics).droppedFrames : 0;

    console.log("metrices");
    console.log("Get current track for video");console.log( player.getCurrentTrackFor(type));
    console.log("Get Quality current for");console.log( player.getQualityFor(type));
    console.log("Get playback rate: ");console.log( player.getPlaybackRate());
    console.log("Rep Switch : ");console.log(repSwitch);
    console.log("Current Dropped Frames:");console.log( dashMetrics.getCurrentDroppedFrames(metrics));
    console.log("Buffer stable time:");console.log(player.getStableBufferTime());
    console.log("Buffer level" + bufferLevel + " Index " + index + " DroppedFrames" + droppedFPS);

}



