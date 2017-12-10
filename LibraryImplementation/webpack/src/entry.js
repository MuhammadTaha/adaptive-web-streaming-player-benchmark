import {MediaPlayer, Debug} from 'dashjs';

let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
// let url = "https://dash.akamaized.net/envivio/Envivio-dash2/manifest.mpd";
console.log("dsdfsdf");

// let deb = new Debug();

let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#myMainVideoPlayer'), url, true);
console.log("Metrics");

console.log(player.getInitialBitrateFor());
// console.log(player.getBandwidthForRepresentation('video'));

console.log(player.getQualityFor("video"));
console.log(player.getMetricsFor("video"));
console.log(player.getMetricsFor("audio"));

console.log(player.getStableBufferTime());

// player.