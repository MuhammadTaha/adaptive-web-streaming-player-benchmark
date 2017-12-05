import {MediaPlayer} from 'dashjs';

let url = "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd";
// let url = "https://dash.akamaized.net/envivio/Envivio-dash2/manifest.mpd";
console.log("dsdfsdf");
let player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector('#myMainVideoPlayer'), url, true);
console.log("Metrics");
console.log(player.getDashMetrics());
