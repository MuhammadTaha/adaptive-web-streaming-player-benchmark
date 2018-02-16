import {MediaPlayer, Debug} from 'dashjs';
import promise from 'promise';
import Fingerprint2 from 'fingerprintjs2';
import {BenchmarkMetrics, BrowserDetails} from "./BenchmarkMetrics";
import ProgressBar from 'progressbar.js';
import browserInfo from 'browser-info';

import $ from "jquery";


let TEST_COUNT = 3;
let tag = 0;
let METRICES_COUNT = 9;

let myStorage = window.localStorage;
let storage_item_menifest_load = "manifest_load_time_";
let storage_item_playback_delay = "playback_delay_time_";
let processInfo = '';


// Initializing Player
let url = "http://demo.unified-streaming.com/video/ateam/ateam.ism/ateam.mpd";
let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#dashPlayer'), url, false);
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
btnSendData.style.marginLeft = "1%";

divBench.appendChild(btnSendData);

// Adding Progressbar div
let divProgressbar = document.createElement("div");
divProgressbar.id = "progressbar";
divProgressbar.style.cssText = "width: 50%;margin-left: 25%;text-align: right;";

divBench.appendChild(divProgressbar);
elementTag[0].parentNode.insertBefore(divBench, elementTag[0]);

var bar = new ProgressBar.Line("#progressbar", {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FF8100',
    trailColor: '#EEE',
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

function setProgressValue(barObj, totalCycles, currentCycle, currentStage, totalStages) {

    let ans = (currentCycle / totalCycles).toFixed(3);
    // let ans = ((currentCycle/totalCycles)*(currentStage/totalStages)).toFixed(3);

    bar = barObj;
    bar.animate(ans);  // Number from 0.0 to 1.0
    bar.set(ans);
}


let delays = new Array(TEST_COUNT)
let delaysCollection = new Array();

//getting browser info
let bInfo = browserInfo();

new Fingerprint2().get(function (browserId, components) {

    delaysCollection.push({
        "browserId": browserId,
        "browserName": bInfo.name,
        "browserVersion": bInfo.version
    });
});


let delayObj = new BenchmarkMetrics();


function start_benchmark() {
    bar.animate(0.0);  // Number from 0.0 to 1.0
    bar.set(0.0);
    playback_restart();
}

// for restarting the stream
function playback_restart() {

    player.seek(0);

    startingTime = Date.now();
    delaysCollection.push(delayObj);
    console.log(JSON.stringify(delaysCollection));

    delayObj = new BenchmarkMetrics();
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


let manifestLoadTime = 0;
let stages = 8;

player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {

    // setProgressValue(bar,TEST_COUNT, tag+1,1,stages);

    delayObj.manifestLoad = Date.now() - startingTime;
    manifestLoadTime = Date.now();
    updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {
    // setProgressValue(bar,TEST_COUNT, tag+1,2,stages);
    delayObj.streamInitialised = Date.now() - manifestLoadTime;
    updateMetrics("video", player);
});


player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {

    // setProgressValue(bar,TEST_COUNT, tag+1,3,stages);
    delayObj.playbackStartDelay = Date.now() - manifestLoadTime;
    updateMetrics("video", player);
});

let timeStart = 0;
let timeStartSeeking = 0;
player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {

    // setProgressValue(bar,TEST_COUNT, tag+1,4,stages);
    timeStart = Date.now();
    updateMetrics("video", player);

});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {

    delayObj.qualityChangeDelay = Date.now() - timeStart;
    // setProgressValue(bar,TEST_COUNT, tag+1,5,stages);
    updateMetrics("video", player);
});

player.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKING, function (e) {

    delays[tag][6] = Date.now();
    // setProgressValue(bar,TEST_COUNT, tag+1,6,stages);
    timeStartSeeking = Date.now();
    updateMetrics("video", player);
});

player.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKED, function (e) {

    // setProgressValue(bar,TEST_COUNT, tag+1,7,stages);
    delays[tag][7] = Date.now();
    delayObj.playbackSeekingDelay = Date.now() - timeStartSeeking;
    updateMetrics("video", player);
});


player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {

    setProgressValue(bar, TEST_COUNT, tag + 1, 8, stages);
    updateMetrics("video", player);

    if (tag < TEST_COUNT - 1) {
        tag = tag + 1;
        playback_restart();
    } else {
        player.seek(0);
        player.pause();
        tag = 0;
        send_data();
    }
});


function updateMetrics(type, player) {

    var metrics = player.getMetricsFor(type);
    var dashMetrics = player.getDashMetrics();

    var repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
    var bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);

    delayObj.bufferLevel.push(bufferLevel);

    var index = player.getQualityFor(type);
    var droppedFPS = dashMetrics.getCurrentDroppedFrames(metrics) ? dashMetrics.getCurrentDroppedFrames(metrics).droppedFrames : 0;
    delayObj.droppedFrames = droppedFPS;

    delayObj.playbackRate = player.getPlaybackRate();
    delayObj.bufferStableTime = player.getStableBufferTime();
}


function send_data() {

    $(function () {

        var url = "http://localhost:4022/metricvalues";
        var data = JSON.stringify(delaysCollection);

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            // contentType: "application/json",
            //dataType: "json",
            success: function (response) {
                console.log("ResponseData:" + response);
            },
            error: function (error) {
                console.log("ErrorData:" + response);
            }
        });
    });
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let obj = Object.values(request.processInfo);

        delayObj.memoryUsage.push(obj[0].privateMemory);
        // if (request.processInfo) {
        sendResponse({farewell: "goodbye"});
        // }
    }
);

