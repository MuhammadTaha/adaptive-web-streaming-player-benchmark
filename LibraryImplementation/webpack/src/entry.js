import {MediaPlayer, Debug} from 'dashjs';
// import {MediaPlayer, Debug} from '';

// require('../../webpack/src');
// import {} from 'stream';
// import {VideoModel} from 'dashjs';

// import {} from "";


let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";

let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#myMainVideoPlayer'), url, true);
console.log("Metrics");
// console.log(player.getActiveStream().getMetricsFor('video'));
// let vm = new VideoModel();
console.log(player.getLiveDelay());
console.log("matewete");
player.on("click",function(e){

    alert("player clicked");

});
let playerTag =document.querySelector('#myMainVideoPlayer');
let systemInfo = chrome.system;

// updateMetrics("video",player);
player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {
    console.log("Stream initialized");
    updateMetrics("video",player);
});

player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
    console.log("Quality change rendered");
    updateMetrics("video",player);
    // chrome.processes.onUpdatedWithMemory.addListener((obj)=>{
    //     console.log(obj);
    // });

console.log(systemInfo);
    // systemInfo.memory.getInfo((info)=>{
    //     console.log(info);
    // });
});
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






function updateMetrics(type,player) {
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
   console.log(repSwitch);
   console.log(dashMetrics.getCurrentDroppedFrames(metrics) );
   console.log(player.getStableBufferTime());
   console.log( bufferLevel + " "+ index + " "+droppedFPS);

}


// let dF = new DroppedFrames();
// console.log(dF.droppedFrames);
// let dropFrames =  dashjs.DroppedFrames();
// console.log(player.getCurrentDroppedFrames());
// }
// player.