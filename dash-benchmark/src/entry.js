import {MediaPlayer, Debug} from 'dashjs';
import promise from 'promise';
import Fingerprint2 from 'fingerprintjs2';




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
let tag = 1;
let startingTime = 0;
let myStorage = window.localStorage;
let storage_item_menifest_load="manifest_load_time_";
let storage_item_playback_delay="playback_delay_time_";
let processInfo = '';


// Initializing Player
let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
// let url =   "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" ;
let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#dashPlayer'), url, false);





startingTime = Date.now();

//initialising local web storage


// Adding Benchmark Button to the player
let elementTag = document.getElementsByTagName("video");

let divBench = document.createElement("div");

let btnBench = document.createElement("button");
btnBench.type="button";
btnBench.innerHTML="Start Benchmarking";
btnBench.className = "btnBenchmark";
btnBench.name= "btnBenchmark";//auto loop option to the stream

btnBench.setAttribute("onclick","playback_restart()");
divBench.appendChild(btnBench) ;


// Send Data Button.
let divSendData = document.createElement("div");

let btnSendData = document.createElement("button");
btnSendData.type="button";
btnSendData.innerHTML="Send Date";
btnSendData.className = "btnSendDataBenchmark";
btnSendData.name= "btnSendDataBenchmark";//auto loop option to the stream


//auto loop option to the stream
elementTag[0].setAttribute("loop",true);

btnSendData.setAttribute("onclick","send_data()");
divSendData.appendChild(btnSendData) ;

 function playback_restart(){
     // for restarting the stream
     player.seek(0);

     player.play();
 }

for (var i = 0; i < buttonsBenchmark.length; i++) {
    buttonsBenchmark[i].addEventListener('click', playback_restart, false);

}
console.log(player.getLiveDelay());


for (var i = 0; i < buttonsSendData.length; i++) {
    buttonsSendData[i].addEventListener('click', send_data(), false);

}

// let el_body = document.getElementsByTagName('body')
// var event = new Event(chrome.tabs.onActivated);  // (*)
// el_body.dispatchEvent(event);
// HTMLElement el_body = document.getElementsByTagName('body');


let delays = [];
delays["manifestLoaded"]=[];
delays["streamInitialization"]=[];
delays["playbackStarted"]=[];
delays["playbackEnded"]=[];
delays["qualityChangeRequested"]=[];
delays["qualityChangeRendered"]=[];
delays["qualityChangeRendered"]=[];


player.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) {

    // var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    // console.log(document.cookie['io']);

    console.log("Manifest loaded");
    console.log(Date.now());

    //storage_item_menifest_load=storage_item_menifest_load+tag;
    //myStorage.setItem(storage_item_menifest_load,(Date.now()-startingTime));
    //storage_item_menifest_load="menifest_load_time_";
   
    delays["manifestLoaded"].push(Date.now()-startingTime);
    console.log(delays);

    console.log("Memory performance");
    console.log(window.performance.memory);
    // updateMetrics("video", player);
});
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {


    console.log("Stream initialized");
    //console.log(Date.now());

    delays["streamInitialization"].push(Date.now());



    updateMetrics("video", player);
    // console.log(processInfo);

});



player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, function (e) {
    console.log("Playback started");
    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);

       storage_item_playback_delay=storage_item_playback_delay+tag;
       myStorage.setItem(storage_item_playback_delay,(Date.now()-startingTime));
       storage_item_playback_delay="playback_delay_time_";
       myStorage.setItem("TEST_COUNT",tag);

    delays["playbackStarted"].push(Date.now());
    console.log("stream info");
    console.log(player.getActiveStream().getStreamInfo());
    // updateMetrics("video", player);
});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
    delays["qualityChangeRequested"].push(Date.now());

    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);

    console.log("Quality change rendered");
    updateMetrics("video", player);

});


player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
    delays["qualityChangeRendered"].push(Date.now());

    console.log(Date.now());
    console.log("Memory performance");
    console.log(window.performance.memory);
    console.log("Quality change rendered");
    updateMetrics("video", player);
    // console.log(processInfo);
});

player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
    console.log("Playback ended");
    console.log(Date.now());
    delays["playbackEnded"].push(Date.now());

    console.log("TEST_COUNT:" + TEST_COUNT);

    // updateMetrics("video", player);

    if (TEST_COUNT > 0){
        console.log(TEST_COUNT );
        tag=tag+1;
        TEST_COUNT=TEST_COUNT-1;
        player.seek(0);
        player.play();
    }
    else {
        player.seek(0);

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

function send_data(){

    //console.log(" Menifest Delays: ");
    //console.log(delays["manifestDelay"]);
     var playback_delay_time = "playback_delay_time_";
     
     
    for(var i=0, len=myStorage.length; i<len; i++) {
        
        var key = myStorage.key(i);
        var value = myStorage[key];
        console.log("Mystorage Val :"+key + " => " + value);
        //console.log(playback_delay_time);
     }   

      var browserId ;

        const getFingerprint = () => new Promise(resolve => {
              (new Fingerprint2()).get((result, components) => resolve({result, components}) )
            })

            const main = async () => {
              // pseudo-synchronous code
              const f = await getFingerprint()
              //btnBenchmark.innerText = f.result
              console.log("Session ID :" + f.result);
              browserId = f.result
              
            }
         setTimeout(main, 0);


         console.log("Final Browser ID :" + browserId);
       
        var t;
        var session_id = new Date().valueOf();
        
        console.log("Final Session ID :" + session_id);

        for(var test=1, t=myStorage.getItem("TEST_COUNT"); test<t; test++){ 
        //playback_delay_time = playback_delay_time + i;
        //console.log("String Before Matched:"+playback_delay_time);
        playback_delay_time=playback_delay_time + test;
        var val = myStorage.getItem(playback_delay_time);
        console.log(":"+playback_delay_time);      
                
                var http = new XMLHttpRequest();
                 
                 //console.log("String Matched:"+playback_delay_time);
                var url = "http://localhost:3002/playback_delay";
                var params = "client_id= " + browserId + " & session_id=" +  session_id + "&unit_id=33&value="+ val;
                http.open("POST", url, true);
        console.log("param:"+ params); 
                //Send the proper header information along with the request
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                http.setRequestHeader("Content-length", params.length);
                http.setRequestHeader("Connection", "close");

                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        alert(http.responseText);
                    }
                }
                http.send(params);
       
          playback_delay_time= "playback_delay_time_";

        }
         
          
         //localStorage.getItem("bar");
    
    myStorage.clear();
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("receive message");
        console.log(request.processInfo);
        // if (request.processInfo) {
            this.processInfo = request.processInfo;
            console.log('send goodbye');
            sendResponse({farewell: "goodbye"});


        // }
});


